const db=require('./connection.js')
exports.cart1=async(user,id)=>{
    const resl=await db.query(`DELETE FROM geturtech.cart WHERE user_id = $1 AND product_id = $2`,[user, id]);
    const reslt=await db.query(`
    SELECT * FROM geturtech.cart c
    JOIN geturtech.products p ON p.id = c.product_id
    JOIN geturtech.images i ON p.id = i.product_id
    WHERE c.user_id = $1 AND i.img_url LIKE '%img1.jpg'`,[user])
    const result1=await db.query(`
    SELECT SUM(product_count) AS cartitems
    FROM geturtech.cart
    WHERE user_id = $1`,[user])
    return {
        reslt: reslt.rows,
        result1: result1.rows
    }
}