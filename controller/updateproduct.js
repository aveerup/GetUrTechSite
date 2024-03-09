const db=require('../db/updateproduct.js')
exports.updateproduct=async(req,res)=>{
    const { productId,name, basePrice, discount, rating, category, subcategory,brand,stock } = req.body;
        try {
            await db.updateproduct(parseInt(productId),name,parseInt(basePrice),parseInt(discount),parseInt(rating),category,subcategory,brand,parseInt(stock));
            connection.release();
            res.send("Update successful.");
            console.log("Update successful.");
    }   
    catch (error) {
            console.log(error);
            res.send(error.message);
        }
}