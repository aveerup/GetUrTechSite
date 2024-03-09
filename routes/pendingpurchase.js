const router =require('./main_router.js')
const con = require('../controller/pendingpurchase.js')
router.post('/pendingPurchase', con.pendingpurchase)
module.exports=router