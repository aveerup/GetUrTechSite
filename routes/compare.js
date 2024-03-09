const router =require('./main_router.js')
const con = require('../controller/compare.js')
router.post('/compare', con.compare)
module.exports=router