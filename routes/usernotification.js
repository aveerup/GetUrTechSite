const router =require('./main_router.js')
const con = require('../controller/usernotification.js')
router.post('/usernotification', con.usernotification)
module.exports=router