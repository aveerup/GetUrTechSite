const db=require('../db/home.js')
exports.home=async(req,res)=>{
    try{
      const result=await db.homeQuery();
      return res.status(201).json(result);
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
  }