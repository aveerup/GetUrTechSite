const router =require('./main_router.js')
const con = require('../controller/payment.js')
router.post('/payment', con.payment)
module.exports=router