const db=require('./connection')
exports.showdetails=async (id,userId) => {
    const result1= await db.query(`
    SELECT P.id, P.name, P.base_price, P.discount, P.rating, P.category, P.subcategory, P.brand, P.stock, I.img_url,
        STRING_AGG(S.attr_name, ', ') AS attnames,
        STRING_AGG(S.attr_value, ', ') AS attvalues
    FROM geturtech.products P
    JOIN geturtech.images I ON P.id = I.product_id
    LEFT JOIN geturtech.spec_table S ON P.id = S.product_id
    WHERE P.id = $1 AND I.img_url LIKE '%img1.jpg'
    GROUP BY P.id, P.name, P.base_price, P.discount, P.rating, P.category, P.subcategory, P.brand, P.stock, I.img_url
`,[id])
    const result2= await db.query( `
    SELECT (U.first_name || ' ' || U.last_name) AS name, R.text
    FROM geturtech.users U
    JOIN geturtech.review R ON U.id = R.user_id
    WHERE R.product_id = $1
`,[id])
    const result3= await db.query(`
    SELECT *
    FROM geturtech.purchase_product PP
    JOIN geturtech.purchase P ON PP.purchase_id = P.purchase_id
    WHERE PP.product_id = $1 AND P.bought_by = $2 AND P.approval_date IS NOT NULL
`,[id,userId])
    //console.log(result1.rows)
    return{
        result1:result1.rows,
        result2:result2.rows,
        result3:result3.rows
    }
}