const db=require('./connection.js')
exports.updateuserinfo=async(userId, firstName, lastName, email, password, phoneNumber, address)=>{`
    UPDATE geturtech.USERS
    SET FIRST_NAME = $2,
        LAST_NAME = $3,
        EMAIL = $4,
        PASS_WORD = $5,
        PHONE_NUMBER = $6,
        user_ADDRESS = $7
    WHERE ID = $1`,[userId, firstName, lastName, email, password, phoneNumber, address]
}