const db=require('./connection')

// used in validators 

exports.emailExists=async (value)=>{
    const result= await db.query('SELECT * from geturtech.users WHERE email = $1', [
        value,
    ])
    return result;
}

exports.loginFieldsCheck=async(value)=>{
   const result= await db.query('SELECT * from geturtech.users WHERE email = $1', [value])
    return result;
}

// used in passport middleware

exports.strat=async(id)=>{
    const result=await db.query(
        'SELECT user_id, email FROM geturtech.users WHERE user_id = $1',
        [id]
      )
      return result;
}

// used in controller

exports.signup=async(firstName,lastName,email,password)=>{
    await db.query('insert into geturtech.users(first_name,last_name,email,password) values ($1 , $2,$3,$4)', [
        firstName,
        lastName,
        email,
        password
      ])
}

// exports. res=async()=>{
//     console.log("hela;ldjk;iajd")
//     console.log(await db.query('select * from geturtech.user_table'))
// }