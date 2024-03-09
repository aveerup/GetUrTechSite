const db=require('./connection.js')
exports.cartquery1=async(id,u_id)=>{
    const result = await db.query( `
    SELECT * FROM geturtech.cart WHERE product_id = $1 AND user_id = $2;
  `,[id, u_id])
  return result;
}
exports.cartquery2=async(count,id)=>{
  const result=await db.query(`select geturtech.is_stock_available($1,$2);`,[count,id])
  return result;
}

exports.cartquery3=async(count,id,u_id)=>{
    const result = await db.query(`
    UPDATE geturtech.cart
    SET product_count = $1
    WHERE product_id = $2 AND user_id = $3;
  `,[count, id, u_id])
}
exports.cartquery4=async(u_id,id)=>{
  const result=await db.query(`
  INSERT INTO geturtech.cart (user_id, product_id, product_count)
  VALUES ($1, $2, $3);
`,[u_id, id, 1])
}

exports.cartquery5=async(u_id)=>{
  const result=await db.query(`
  SELECT c.*, p.*, i.img_url
  FROM geturtech.cart c
  JOIN geturtech.products p ON p.id = c.product_id
  JOIN geturtech.images i ON p.id = i.product_id
  WHERE c.user_id = $1
  AND i.img_url LIKE '%img1.jpg';
`,[u_id])
return result;
}