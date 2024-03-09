const db=require('./connection.js')
exports.review=async(product_id, userId, rating, review)=>{
    await db.query(`INSERT INTO geturtech.review (product_id, user_id, rating, text) VALUES ($1, $2, $3, $4)`,[parseInt(product_id), parseInt(userId), parseInt(rating), review])
}