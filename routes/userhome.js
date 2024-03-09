const router=require('./main_router')
const { verifyToken } = require('../middleware/verify_token.js')
const {userhome,user}=  require('../controller/userhome.js')
const {product}=  require('../controller/product.js')
router.get('/protected/userhome',verifyToken, userhome)
router.get('/protected/userhome/user',verifyToken,user)
//router.post('/protected/userhome/search',search)

module.exports=router
