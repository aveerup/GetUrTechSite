const router =require('./main_router.js')
const con = require('../controller/searchproducts.js')
router.post('/searchedproducts', con.searchproducts)
module.exports=router