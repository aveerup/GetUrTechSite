const db=require('./connection')
exports.addcomment=async(productId,userId,text)=>{
    const result= await db.query( `
    INSERT INTO geturtech.comments (product_id, user_id, text)
    VALUES ($1, $2, $3)
    RETURNING comment_id AS "commentId";
    `,[productId,userId,text])
    return result
}