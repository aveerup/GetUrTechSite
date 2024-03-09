const db=require('../db/showmenuproducts.js')
exports.showmenuproducts=async(req,res)=>{
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const brand = req.body.brand;
    try {
        const rslt=await db.showmenuproducts(category,subcategory,brand)
        res.json(rslt);
    } catch (err) {
        res.send(err.message);
    }
}
