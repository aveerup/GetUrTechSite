const router =require('./main_router.js')
const path= require('path');
const fs = require('fs-extra');
const multer = require('multer');
const tempStorage = multer.diskStorage({});
const upload = multer({ storage:tempStorage });
const con = require('../controller/addnewproduct.js')
router.post('/addNewProduct',upload.single('image'), con.addnewproduct)
module.exports=router