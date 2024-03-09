const db=require('../db/addnewproduct.js')
exports.addnewproduct=async(req,res)=>{
    const { name, basePrice, discount, category, subcategory, brand, stock } = req.body;
    let imageFile = req.file;
    console.log("req.file ",req.file);
    const rating = 0;

    try {
        const result = await db.addnewproduct(name,
            parseInt(basePrice),
            parseInt(discount),
            parseInt(rating),
            category,
            subcategory,
            brand,
            parseInt(stock),
            imageFile.path);

        const productId = result.rows[0].id;
        console.log(productId);

        const folderName = productId.toString();
        const newFolderPath = path.join(__dirname, 'src', 'image', folderName);
        console.log(newFolderPath);

        if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);
        }

        const destinationPath = path.join(newFolderPath, req.file.originalname);
        console.log(destinationPath);

        fs.copyFileSync(req.file.path, destinationPath);
        fs.unlinkSync(req.file.path);

        //console.log(req.file);
        res.send(imageFile);
        console.log("Adding successful.");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
