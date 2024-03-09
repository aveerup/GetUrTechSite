const db=require('./connection.js')
exports.reply=async(productId,userId,text,parentCommentId)=>{
    const result=await db.query(`
    INSERT INTO geturtech.comments (product_id, user_id, text, comment_on)
    VALUES ($1, $2, $3, $4)
    RETURNING comment_id AS "replyId";
    `,[productId,userId,text,parentCommentId])
    return result
}