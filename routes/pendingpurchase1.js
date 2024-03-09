const router =require('./main_router.js')
const con = require('../controller/pendingpurchase1.js')
router.post('/pendingPurchase1', con.pendingpurchase1)
module.exports=router