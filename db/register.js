const db=require('./connection')
exports.registerQuery1=async(email) =>{
    const emailCheckQuery = await db.query(`
    select geturtech.is_email_registered($1)`,[email]);
    return emailCheckQuery;
}
exports.registerQuery2=async(firstName,lastName,email,hashedPassword,phoneNumber,address,role) =>{
    const insertQuery = db.query(`
          INSERT INTO geturtech.users (first_name, last_name, email, pass_word, phone_number, user_address, role)
          VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,[firstName, lastName, email, hashedPassword, phoneNumber, address, role]);
}