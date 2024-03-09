const db=require('./connection.js')
exports.showmenuproducts=async(category,subcategory,brand)=>{
    const result=await db.query(`SELECT *
    FROM geturtech.products p
    JOIN geturtech.images i ON p.id = i.product_id
    WHERE UPPER(p.category) LIKE $1
      AND (UPPER(p.subcategory) LIKE $2 OR $2 LIKE 'DEFAULTSUBCATEGORY')
      AND (UPPER(p.brand) LIKE $3 OR $3 LIKE 'DEFAULTBRAND')
      AND i.img_url LIKE '%img1.jpg';
    `,[category.toUpperCase(),subcategory.toUpperCase(),brand.toUpperCase()])
    const result1=await db.query(`SELECT DISTINCT brand
    FROM geturtech.products
    WHERE UPPER(category) LIKE $1;
    `,[category.toUpperCase()])
    console.log()
    return {
        result:result.rows,
        result1:result1.rows,
    }
}