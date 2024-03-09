const db=require('./connection.js')
exports.addnewproduct=async(name1,basePrice,discount,rating,category,subcategory,brand,stock,path)=>{

    const result=await db.query(`WITH inserted_product AS (
        INSERT INTO geturtech.products (name, base_price, discount, rating, category, subcategory, brand, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
    )
    INSERT INTO geturtech.images (product_id, img_url)
    SELECT id, $9
    FROM inserted_product`,[name1,
        basePrice,
        discount,
        rating,
        category,
        subcategory,
        brand,
        stock,
        path]
    )
    return result;
}