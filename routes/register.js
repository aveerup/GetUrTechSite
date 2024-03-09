const router =require('./main_router.js')
const con = require('../controller/register.js')
router.post('/register', con.register)
module.exports=router