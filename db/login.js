const db=require('./connection')
exports.loginQuery=async(email,password) =>{
    const qu = await db.query(`SELECT id, pass_word FROM geturtech.users`);
    return qu;
}

exports.loginQuery2=async(email,password) =>{
    const queryLogin = await db.query(`SELECT id, email, pass_word, role, first_name, last_name
                      FROM geturtech.users 
                      WHERE email = $1 AND pass_word = $2`,[email,password]);
    return queryLogin;
}

exports.loginQuery3=async(id) =>{
    const queryCount = await db.query(`SELECT count(*) from geturtech.cart where user_id=$1`,[id]);
    const queryCartItems = await db.query(`SELECT * FROM geturtech.cart c 
                              JOIN geturtech.products p ON p.id=c.product_id 
                              JOIN geturtech.images i ON i.product_id=p.id 
                              WHERE c.user_id=$1 AND i.img_url LIKE '%img1.jpg'`,[id]);
  
    return{
        queryCount:queryCount,
        queryCartItems:queryCartItems
    };
}