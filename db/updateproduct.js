const db=require('./connection.js')
exports.updateproduct=async(productId,name, basePrice, discount, rating, category, subcategory,brand,stock)=>{
    console.log(productId," ",name," ",basePrice," ",discount," ",rating," ",category," ", subcategory," ",brand," ",stock);
    const result=await db.query(`UPDATE geturtech.products
    SET name = $1,
        base_price = $2,
        discount = $3,
        rating=$4,
        category = $5,
        subcategory = $6,
        brand = $7,
        stock = $8
    WHERE id = $9;
    `,[     name,
            basePrice,
            discount,
            rating,
            category,
            subcategory,
            brand,
            stock,
            productId]
    )
    return result;
}