const db=require('./connection.js')
exports.pendingpurchase=async()=>{
       const result=await db.query(`
       SELECT DISTINCT P.PURCHASE_ID,U.FIRST_NAME,U.ID,U.ROLE,P.PURCHASE_DATE,P.PAYMENT_INFO,PR.NAME,PU.PRODUCT_COUNT
        FROM geturtech.PURCHASE P 
        JOIN geturtech.PURCHASE_PRODUCT PU 
          ON P.PURCHASE_ID=PU.PURCHASE_ID 
        JOIN geturtech.PRODUCTS PR 
          ON PU.PRODUCT_ID=PR.ID 
        JOIN geturtech.USERS U 
          ON U.ID=P.BOUGHT_BY
        WHERE P.APPROVAL_DATE IS NULL AND U.ROLE='customer' 
        ORDER BY P.PURCHASE_DATE`)
    return result;
}