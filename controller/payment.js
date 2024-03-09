const db=require('../db/payment.js')
exports.payment=async(req,res)=>{
    const { orderedProducts, paymentInfo, address } = req.body;

  const user = orderedProducts[0].user_id;

  try {
      // Insert into PURCHASE table and get PURCHASE_ID
      const resultInsertPurchase = await db.payment1(paymentInfo, address, user);
      const purchaseId = resultInsertPurchase.rows[0].purchase_id;
      // Insert into PURCHASE_PRODUCT table for each ordered product
      for (let i = 0; i < orderedProducts.length; i++) {
          await db.payment2(purchaseId, orderedProducts[i].product_id, orderedProducts[i].product_count);
      }
      res.json("Payment Successful");
  } catch (error) {
      res.send(error.message);
  }
}
