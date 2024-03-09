const router =require('./main_router.js')
const con = require('../controller/review.js')
router.post('/productReview', con.review)
module.exports=router