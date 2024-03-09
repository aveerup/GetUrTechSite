const db=require('./connection.js')
exports.usernotification=async(user)=>{
    const result=await db.query(`
    SELECT * FROM GETURTECH.USER_NOTIFICATION 
    WHERE USER_ID = $1 
    ORDER BY RECEIVE_DATE DESC`,[user])
    return result;
}