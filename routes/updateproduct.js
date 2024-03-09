const router =require('./main_router.js')
const con = require('../controller/updateproduct.js')
router.post('/updateProduct', con.updateproduct)
console.log(con.updateproduct);
module.exports=router