const db=require('./connection.js')
exports.payment1=async(paymentInfo, address, user)=>{
    const result = await db.query(`
    INSERT INTO GETURTECH.PURCHASE (PAYMENT_INFO, ADDRESS, BOUGHT_BY)
    VALUES ($1, $2, $3)
    RETURNING PURCHASE_ID`,[paymentInfo,address,user]);
    return result
}
exports.payment2=async(purchaseId,productId,product_count)=>{
    const result= await db.query(`INSERT INTO GETURTECH.PURCHASE_PRODUCT (PURCHASE_ID, PRODUCT_ID, PRODUCT_COUNT)
    VALUES ($1, $2, $3)`,[purchaseId,productId,product_count])
}
