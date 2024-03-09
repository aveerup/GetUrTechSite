const router =require('./main_router.js')
const con = require('../controller/reply.js')
router.post('/addReply', con.reply)
module.exports=router