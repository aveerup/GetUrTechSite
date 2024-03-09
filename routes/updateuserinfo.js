const router =require('./main_router.js')
const con = require('../controller/updateuserinfo.js')
router.post('/updateUserInfo', con.updateuserinfo)
module.exports=router