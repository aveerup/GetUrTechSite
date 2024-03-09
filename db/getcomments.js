const db=require('./connection.js')
exports.getcomments=async(productId)=>{
    const result=await db.query(`
    SELECT 
      c1.comment_id,
      c1.product_id,
      c1.user_id,
      c1.text,
      c1.comment_date,
      c2.comment_id AS parent_comment_id,
      u.first_name,
      u.last_name
    FROM geturtech.comments c1
    LEFT JOIN geturtech.comments c2 ON c1.comment_on = c2.comment_id
    LEFT JOIN geturtech.users u ON c1.user_id = u.id
    WHERE c1.product_id = $1
    ORDER BY c1.comment_date ASC`,[productId])
    return result
}