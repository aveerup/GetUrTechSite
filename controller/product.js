const db_product=require('../db/product.js')
exports.products=async(req,res)=>{
    try{
      console.log(req.params.id)  
      const result=await db_product.product(req.params.id)  
      return res.status(201).json({
        success: true,
        message: `product id is ${req.params.id}`,
        products: result.rows,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }

}

exports.createCart=async(req,res)=>{
    try{
        const{cartId,productId}=req.body 
        await db_product.addItem({cart_id:cartId,product_id:productId})
        return res.status(201).json({
            success: true,
            message: `cart id is ${cartId} and product id is ${productId}`,
        })
    }  catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
}