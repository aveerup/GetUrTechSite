const db=require('../db/updateuserinfo.js')
exports.updateuserinfo=async(req, res)=>{
    const { userId, firstName, lastName, email, password, phoneNumber, address } = req.body;
    //console.log("req.body ",req.body);
    try {
      // Execute the update query
      await db.updateuserinfo(userId, firstName, lastName, email, password, phoneNumber, address);
      // Send success message as response
      res.send("Update successful.");
      console.log("Update successful.");
    } catch (err) {
      // Send error message as response
      res.send(err.message);
      console.error(err);
    }
}
