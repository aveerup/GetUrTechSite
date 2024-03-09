const router =require('./main_router.js')
const con = require('../controller/cart.js')
router.post('/cart', con.cart)
module.exports=router