const db=require('./connection')
exports.product=async(id) =>{
    const result=await db.query('SELECT * FROM geturtech.products WHERE product_id like $1',[id])
    return result
}
exports.addItem = async ({ cart_id, product_id}) => {
    try {
        await db.query('CALL geturtech.cart_exist($1,$2)', [cart_id,product_id]);
    } catch (error) {
        throw error;
    } 
}
