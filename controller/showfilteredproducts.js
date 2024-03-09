const db=require('../db/connection.js')
exports.showfilteredproducts=async(req,res)=>{
    try {
        const {category,selectedSubcategories,subcategory,
        selectedBrands,
        selectedProcessors,
        selectedRams,
        selectedDisplay,
        selectedStorage,
        selectedGraphics,minPrice,maxPrice}=req.body;
    let query = `SELECT *
    FROM geturtech.products p
    JOIN geturtech.images i ON p.id = i.product_id
    WHERE UPPER(p.category) LIKE '${category.toUpperCase()}'`;
    

        if (selectedSubcategories.length > 0) {
            const subcategoryPlaceholders = selectedSubcategories.map(subcategory => `'${subcategory.toUpperCase()}'`).join(', ');
            console.log(subcategoryPlaceholders);
            query += `AND UPPER(p.SUBCATEGORY) IN (${subcategoryPlaceholders})`;
        }

        if (selectedBrands.length > 0) {
            const brandPlaceholders = selectedBrands.map(brand => `'${brand.toUpperCase()}'`).join(', ');
            console.log(brandPlaceholders);
            if(selectedSubcategories.length > 0){
            const subcategoryPlaceholders = selectedSubcategories.map(subcategory => `'${subcategory.toUpperCase()}'`).join(', ');
            query += `
            AND UPPER(P.BRAND) IN (${brandPlaceholders}) 
            AND (
                UPPER(P.SUBCATEGORY) || '/' || UPPER(P.BRAND) IN (
                    SELECT DISTINCT UPPER(SUBCATEGORY) || '/' || UPPER(BRAND)
                    FROM GETURTECH.PRODUCTS
                    WHERE UPPER(CATEGORY) LIKE '${category.toUpperCase()}'
                    AND UPPER(SUBCATEGORY) IN (${subcategoryPlaceholders})
                )
                OR UPPER(P.BRAND) NOT IN (
                    SELECT DISTINCT UPPER(BRAND)
                    FROM GETURTECH.PRODUCTS
                    WHERE UPPER(CATEGORY) LIKE '${category.toUpperCase()}'
                    AND UPPER(SUBCATEGORY) IN (${subcategoryPlaceholders})
                )
            )
        `;
            }
            else if(selectedSubcategories.length === 0)
            {
                query +=`AND UPPER(P.SUBCATEGORY) LIKE '${subcategory.toUpperCase()}' AND UPPER(P.BRAND) IN (${brandPlaceholders})`;
            }
        }
        query += ` AND P.BASE_PRICE BETWEEN ${minPrice} AND ${maxPrice} `;
        
        if(category==='Laptop' || category==='Desktop')
        {   
            if(category==='Laptop')
            {
                if(selectedDisplay.length>0){
                
                    const displayPlaceholders = selectedDisplay.map(b => `${b.toUpperCase()}"`).join('|');
                    console.log(displayPlaceholders);
                    query += `AND REGEXP_LIKE(P.NAME, '${displayPlaceholders}', 'i')`;
                }
            }
            if(selectedRams.length>0){
            
                const ramPlaceholders = selectedRams.map(b => ` ${b.toUpperCase()} RAM`).join('|');
                query += `AND REGEXP_LIKE(P.NAME, '${ramPlaceholders}', 'i')`;
            }
            if(selectedProcessors.length>0){
                
                const processPlaceholders = selectedProcessors.map(b => ` ${b.toUpperCase()} `).join('|');
                
                query += `AND REGEXP_LIKE(P.NAME, '${processPlaceholders}', 'i')`;
            }
            if(selectedStorage.length>0){
            
                const storagePlaceholders = selectedStorage.map(b => ` ${b.toUpperCase()} SSD`).join('|');
                
                query += `AND REGEXP_LIKE(P.NAME, '${storagePlaceholders}', 'i')`;
            }
            if(selectedGraphics.length>0){
                const graphicsPlaceholders = selectedGraphics.map(b => `${b.toUpperCase()}`).join('|');
                console.log(graphicsPlaceholders);
                query += `AND REGEXP_LIKE(P.NAME, '${graphicsPlaceholders}', 'i')`;
            }
        }

        query += ` AND I.IMG_URL LIKE '%img1.jpg'`;
        console.log(query);
        const result = await db.query(query);
        console.log(result.rows);
    
        
    res.json(result.rows);
        
    } catch (err) {
        res.send(err.message);
    }
}