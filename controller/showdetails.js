const db=require('../db/showdetails.js')

exports.showdetails=async (req, res) => {
    const { id, userId } = req.body;
    try {
        const result = await db.showdetails(id, userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}