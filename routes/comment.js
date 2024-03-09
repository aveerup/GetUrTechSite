const router =require('./main_router.js')
const con = require('../controller/comment.js')
router.post('/addComment',con.addcomment)
module.exports=router