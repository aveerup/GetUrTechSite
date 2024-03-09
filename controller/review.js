const db=require('../db/review.js')
exports.review=async(req,res)=>{
    const { product_id, userId, rating, review } = req.body;
    try {
      await db.review(product_id,userId,rating,review);
      res.send("Successful.");
      //console.log("Successful.");
    } catch (error) {
      //console.error(error);
      res.send(error.message);
    }
}