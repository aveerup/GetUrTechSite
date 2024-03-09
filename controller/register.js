const db=require('../db/register.js')
const bcrypt = require('bcrypt');
exports.register= async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, address } = req.body;
    const role = "customer";
  
    try {
      const emailCheckResult = await db.registerQuery1(email);
      if (emailCheckResult.rows[0].is_email_registered)
      {
        console.log('Email is already registered.');
        return res.json({ error: 'Email is already registered.' });
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred during password hashing.' });
        }
        const hashedPassword = hash; 
        await db.registerQuery2(firstName, lastName, email, hashedPassword, phoneNumber, address, role);  
        console.log('Registration successful.');
        res.json('Registration successful.');
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  };
exports.bcr=()=>{
    return bcrypt;
}