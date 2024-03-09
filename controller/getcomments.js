const db=require('../db/getcomments.js')
exports.getcomments=async(req,res)=>{
    const { product_id } = req.params;

    try {
    const result = await db.getcomments(parseInt(product_id));

    const comments = [];
    const commentMap = new Map();

    // Group comments by their parent comment ID (replies)
    result.rows.forEach(row => {
        const comment = {
        commentId: row.comment_id,
        productId: row.product_id,
        userId: row.user_id,
        userName: `${row.first_name} ${row.last_name}`,
        text: row.text,
        commentDate: row.comment_date,
        replies: [],
        };

        if (row.parent_comment_id === null) {
        comments.push(comment);
        } else {
        if (commentMap.has(row.parent_comment_id)) {
            commentMap.get(row.parent_comment_id).replies.push(comment);
        }
        }

        commentMap.set(row.comment_id, comment);
    });

    res.json(comments);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }

}