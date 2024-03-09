const router =require('./main_router.js')
const con = require('../controller/showmenuproducts.js')
router.post('/showmenuproducts', con.showmenuproducts)
module.exports=router