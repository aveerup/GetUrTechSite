const router =require('./main_router.js')
const con = require('../controller/cart1.js')
router.post('/cart1', con.cart1)
module.exports=router