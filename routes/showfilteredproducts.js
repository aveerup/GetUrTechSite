const router =require('./main_router.js')
const con = require('../controller/showfilteredproducts.js')
router.post('/showfilteredproducts', con.showfilteredproducts)
module.exports=router