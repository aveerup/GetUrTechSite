const db_userhome=require('../db/userhome.js')

exports.userhome=async(req,res)=>{
    try{
      
      const result=await db_userhome.products()
      
      return res.status(201).json({
        success: true,
        message: 'welcome to the home page',
        offerproducts: result.offerProducts.rows,
        featuredproducts: result.featuredProducts.rows,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
  }
  
exports.user=async(req,res)=>{
  try{
    console.log(req.userId)
    const result=await db_userhome.user_id(req.userId)
    // console.log(req.userID)
    return res.status(201).json({
      success: true,
      message: `welcome user ${req.userId}`,
      user: result.user.rows,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}