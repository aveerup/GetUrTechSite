const router =require('./main_router.js')
const con = require('../controller/showdetails.js')
router.post('/showdetails', con.showdetails)
module.exports=router