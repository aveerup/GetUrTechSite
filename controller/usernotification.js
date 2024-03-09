const db=require('../db/usernotification.js')
exports.usernotification=async(req,res)=>{
    const { user } = req.body;
      console.log(user);
      try {
        const result = await db.usernotification(user);
          res.json(result.rows);
      } catch (err) {
          res.send(err.message);
      }
}