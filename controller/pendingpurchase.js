const db=require('../db/pendingpurchase')
exports.pendingpurchase=async(req,res)=>{
    try {
        const result = await db.pendingpurchase();
        res.json(result.rows);
    } catch (err) {
        res.send(err.message);
    }
}