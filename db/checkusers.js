const db=require('./connection.js')
exports.checkusers=async()=>{
    const result = await db.query(`SELECT * FROM GETURTECH.USERS`);
    return result;
}