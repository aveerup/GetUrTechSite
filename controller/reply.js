const db=require('../db/reply.js')
exports.reply=async(req,res)=>{
    const { productId, userId, text, parentCommentId } = req.body;
    try {
      const result = await db.reply(productId, userId, text, parentCommentId);
      const replyId = result.rows[0].replyId;
      res.json({ replyId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the reply.' });
    }
}