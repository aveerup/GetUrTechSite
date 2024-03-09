const db=require('../db/comment.js')
exports.addcomment=async(req,res)=>{
    const { productId, userId, text } = req.body;
    try {
    const result = await db.addcomment(parseInt(productId),parseInt(userId),text);
    const commentId = result.rows[0].commentId;
    res.json({ commentId });
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the comment.' });
    }
}
