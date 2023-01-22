const PostCompetition = require('../models/postCompetition')

module.exports = async (req, res)=>{
    try{
        const postcompetition = await PostCompetition.find();
        res.status(200).json(postcompetition);
    }
    catch(error){
        res.status(404).json({
            "message":error.message
        })
    }
}