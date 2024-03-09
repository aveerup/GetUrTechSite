const db=require('./connection')

exports.showAllProducts=async ()=>{
    const motherboard = await db.query("select * from geturtech.products where product_id like 'mb%'")
    const cases = await db.query("select * from geturtech.products where product_id like 'cs%'")
    const ram = await db.query("select * from geturtech.products where product_id like 'rm%'")
    const ssd = await db.query("select * from geturtech.products where product_id like 'sd%'")
    const cpu = await db.query("select * from geturtech.products where product_id like 'cp%'")
    const gpu = await db.query("select * from geturtech.products where product_id like 'gp%'")
    const psu = await db.query("select * from geturtech.products where product_id like 'ps%'")
    const monitor = await db.query("select * from geturtech.products where product_id like 'mn%'")
    const fan = await db.query("select * from geturtech.products where product_id like 'fn%'")
    const ups = await db.query("select * from geturtech.products where product_id like 'up%'")
    return{
        motherboard:motherboard,
        cases:cases,
        ram:ram,
        ssd:ssd,
        cpu:cpu,
        gpu:gpu,
        psu:psu,
        monitor:monitor,
        fan:fan,
        ups:ups
    }
}

exports.products=async()=>{
    const offerProducts=await db.query(`
    SELECT * from geturtech.products
    where offer_code in
    (
        SELECT offer_code 
        from geturtech.offers 
        WHERE start_date<=CURRENT_DATE and end_date>=CURRENT_DATE
        
    )`)

    const featuredProducts=await db.query(`
    SELECT p.product_id ,p.name,p.image,p.model,p.brand,p.tier,p.stock,p.price,p.offer_code
    FROM geturtech.products p 
    JOIN (
        SELECT product_id ,quantity
        FROM geturtech.sales_products
    ) q ON p.product_id = q.product_id
    ORDER BY q.quantity DESC;
    `)
    return{
        offerProducts:offerProducts,
        featuredProducts:featuredProducts
    }
}

exports.user_id=async(id)=>{
    const user=await db.query(`
    SELECT first_name,last_name,(house_no || ' , ' || postal_code || ' , ' || district || ' , ' || country ) as location
    FROM geturtech.user_table
    where user_id=$1;
    `,[id])
    return{
        user:user
    }  
}

// exports.search=async(search)=>{
//     const result=await db.query(`
//     SELECT * from geturtech.products
//     where name like $1 or brand like $1 or model like $1;
//     `,[search])
//     return{
//         result:result
//     }
// }