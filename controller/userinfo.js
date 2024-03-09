const db=require('../db/userinfo.js')
exports.userinfo=async(req,res)=>{
    const id = req.body.userId;
    //console.log(id);
  
    try {
      // Execute the query using db.query
      const result = await db.userinfo(id);
  
      // Send the user information as JSON response
      //console.log(result.rows);
      res.json(result.rows);
    } catch (err) {
      // Send the error message as response
      res.send(err.message);
      console.error(err);
    }
}
