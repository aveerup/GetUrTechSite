const db=require('../db/pendingpurchase1.js')
exports.pendingpurchase1=async(req,res)=>{
    const { purchaseId, userId, msg } = req.body;
  console.log(userId);
  try {
      await db.pendingpurchase1(purchaseId,userId,msg);   
      res.json("Successful");
  } catch (err) {
      res.send(err.message);
  }
}