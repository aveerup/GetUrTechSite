const router =require('./main_router.js')
const con = require('../controller/home.js')
router.get('/', con.home)
module.exports=router