const db=require('./connection.js')
exports.userinfo=async(id)=>{
    const result=await db.query(`
        SELECT *
        FROM geturtech.users
        WHERE ID = $1`, [id])
    return result;
}