const db=require('./connection.js')
exports.pendingpurchase1=async(purchaseId, userId, msg)=>{
    await db.query(`UPDATE GETURTECH.PURCHASE 
    SET APPROVAL_DATE = CURRENT_TIMESTAMP
    WHERE PURCHASE_ID = $1`,[purchaseId])
    await db.query(`INSERT INTO GETURTECH.USER_NOTIFICATION (USER_ID, MESSAGE)`,[userId, msg])
}