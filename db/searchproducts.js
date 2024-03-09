const db=require('./connection.js')
exports.searchproducts=async(key)=>{
    const result = await db.query(`
    WITH searched_products AS (
        SELECT p.*, i.*
        FROM geturtech.products p
        JOIN geturtech.images i ON p.id = i.product_id
        WHERE UPPER(p.name) LIKE '%' || $1 || '%'
        AND i.img_url LIKE '%img1.jpg%'
      )
      SELECT *
      FROM searched_products
      ORDER BY
        CASE WHEN substring(regexp_replace(name, E'[[:space:]]+$', '', 'g'), 1) = $1 THEN 1 ELSE 2 END,
        name;      
    `,[key])
    return result
}