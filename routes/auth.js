const router =require('./main_router.js')
const { registerValidation, loginValidation } = require('../validators/auth.js')
const { validationMiddleware } = require('../middleware/validation_middleware.js')
const {
    // getusers,
    signup,
    login,
    protected,
    logout,
} = require('../controller/auth.js')
const { userAuth } = require('../middleware/auth_middleware.js')
const { verifyToken } = require('../middleware/verify_token.js')

router.post('/signup', registerValidation, validationMiddleware, signup)
router.get('/protected', userAuth, protected)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout',verifyToken, logout)
module.exports=router