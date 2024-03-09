const db=require('../db/compare.js')
exports.compare=async(req,res)=>{
    const { product1, product2 } = req.body;
        console.log(product1);
        try {
            const result = await db.compare(product1, product2);
            res.send(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
}
