const db=require('../db/cart1.js')
exports.cart1=async(req,res)=>{
    const { user, id } = req.body;
    try {
        const r = await db.cart1(user,id);
        res.json(r);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}