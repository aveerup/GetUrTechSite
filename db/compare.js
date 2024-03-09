const db=require('./connection.js')
exports.compare=async(product_id1, product_id2)=>{
    const result=await db.query(`SELECT * FROM geturtech.spec_table WHERE product_id=$1 OR product_id=$2`,[product_id1, product_id2])
    return result;
}