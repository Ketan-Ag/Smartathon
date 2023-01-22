const PostCompetition = require('../models/postCompetition');
const PostUser = require('../models/postUser');

module.exports = async (req, resp)=>{

    const users = await PostUser.find();
    const user = users.filter(uses => {
        return uses._id == req.body.user_id
    })
    if(user.length === 0){
        res.json({
            code:-1,
            message:"Invalid User"
        })
    }
    else{
        const newComp = new PostCompetition(req.body);
        try{
            await newComp.save()
            resp.status(201).json(newComp)
        }
        catch(error){
            resp.status(409).json({"message":error.message})
        }
        resp.send(req.body.name);


        await PostUser.findOneAndUpdate({
            _id : req.body.user_id
        },{
            $addToSet:{
                events_posted : newComp._id
            }
        }).then(()=>{
            console.log("added")
        }).catch(err => {
            console.log('err', err)
        })
    }
}