const db=require('../db/searchproducts')
exports.searchproducts=async(req,res)=>{
    const { key } = req.body;
    console.log(key);
    try {
        const result = await db.searchproducts(key.toUpperCase() + '%');
        res.json(result.rows);
    } catch (err) {
        res.send(err.message);
    }
}