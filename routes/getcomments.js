const router =require('./main_router.js')
const con = require('../controller/getcomments.js')
router.get('/getComments/:product_id', con.getcomments)
module.exports=router