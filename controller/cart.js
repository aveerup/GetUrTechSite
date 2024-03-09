const db=require('../db/cart.js')
exports.cart=async(req,res)=>{
    const { u_id, id } = req.body;
  
    try {
      // Check if the item already exists in the cart
      const checkResult = await db.cartquery1(id,u_id);
  
      let msg = '';
  
      if (checkResult.rows.length > 0) {
        // Update product count if the item already exists
        const updateIndex = checkResult.rows.findIndex(
          (item) => item.product_id === id && item.user_id === u_id
        );
        const existingCount = checkResult.rows[updateIndex].product_count;
  
        // Check if stock allows for adding another item
        const check=await db.cartquery2(existingCount,id);
        // const stockResult = await db.cartquery2(id);
        // const availableStock = stockResult.rows[0].stock;
  
        if (check) {
          const updatedCount = existingCount + 1;
          await db.cartquery3(updatedCount,id,u_id);
        } else {
          msg = 'stockOut'; // Indicate out of stock
        }
      } else {
        // Add the item to the cart if it doesn't exist
        await db.cartquery4(u_id,id);
      }
  
      // Retrieve cart items for the user
      const cartResult = await db.cartquery5(u_id);
      const result = cartResult.rows;
      res.json({ result, msg });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding to cart.' });
    }
}