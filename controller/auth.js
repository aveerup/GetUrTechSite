// const db =require('../db/connection.js')
const db_auth=require('../db/auth.js')
const {sign} = require('jsonwebtoken')
const {SECRET} = require('../constants')
// exports.getusers =async (req,res)=>{
//     try{
//       const response=await  db.query('select * from test')
//         console.log(response.rows)
//     }catch(err){
//         console.log(`faced error ${err}`)
//     }
// }

exports.signup = async (req, res) => {
  const {firstname,lastname, email, password } = req.body
  // console.log(req.body.firstName,req.body.lastName,req.body.email,req.body.password)
    // console.log(req.body)
  
  try {
    // await db.query('insert into test(email,password) values ($1 , $2)', [
    //   email,
    //   password
    // ])
    await db_auth.signup(firstname,lastname,email,password)

    return res.status(201).json({
      success: true,
      message: 'The registration was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}




exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}



exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

