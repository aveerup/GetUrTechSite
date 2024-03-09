const router=require('./main_router')
const { verifyToken } = require('../middleware/verify_token.js')
const {products,createCart}=  require('../controller/product.js')
router.get('/protected/products/:id', products)
router.post('/protected/cart',createCart)

module.exports=router