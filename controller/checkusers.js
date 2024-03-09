const db=require('../db/checkusers.js')
exports.checkusers=async(req,res)=>{
    try {
        const result = await db.checkusers();
        res.json(result.rows);
    } catch (err) {
        res.send(err.message);
    } 
}
