const router =require('./main_router.js')
const con = require('../controller/checkusers.js')
router.get('/checkUsers', con.checkusers)
module.exports=router