const router =require('./main_router.js')
const con = require('../controller/userinfo.js')
router.post('/userInfo', con.userinfo)
module.exports=router