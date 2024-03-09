const db=require('../db/login.js')
const bcrypt = require('./register.js').bcr();
exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body
    const passId=await db.loginQuery(email,password)
    async function fun() {
        for (let i = 0; i < passId.rows.length; i++) {
          let hashedPassword = passId.rows[i].pass_word;
          const passwordMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, match) => {
              if (err) {
                reject(err);
              } else {
                resolve(match);
              }
            });
          });
  
          if (passwordMatch) {
            return i;
          }
        }
        return -1;
      }
    const m = await fun();
    let pass = '';
    if (m !== -1) {
      pass = passId.rows[m].pass_word;
    }
    const result = await db.loginQuery2(email, pass);
    const x = result.rows;
    let result1 = [];
    let reslt = [];
    let r = 0;
    if (x.length > 0) {
        const y = result.rows[0].id;
        const rest=await db.loginQuery3(y)
        const queryCountResult = rest.queryCount;
        r = queryCountResult.rows[0].number_of_cartitems;
        reslt = rest.queryCartItems.rows;
      }
      const rslt = {
        result: result.rows,
        result1: r,
        reslt: reslt.rows,
      };
  
      res.send(rslt);
    } catch (err) {
        console.error(err);
        res.send(err.message);
      }
}