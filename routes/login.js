const router =require('./main_router.js')
const con = require('../controller/login.js')
router.post('/login', con.login)
module.exports=router