const PostCompetition = require('../models/postCompetition');
const PostUser = require('../models/postUser')

module.exports = async (req, res)=>{

    //user-name/id , event_name/id, 
    // const event = await PostCompetition.find({_id:req.body.event_id});

    const event = await PostCompetition.find();
    const users = await PostUser.find();

    const eve = event.filter(even => {
        return even._id == req.body.event_id
    })
    const user = users.filter(uses => {
        return uses._id == req.body.user_id
    })

    if(eve.length === 0 || user.length === 0){
        res.json({
            code:-1,
            message:"Invalid User"
        })
    }
    else{
        const neweventreq = eve[0].requests.filter((ere) => {
            return ere.toString() == req.body.user_id
        })
        if(neweventreq.length !== 0){
            res.json("Already applied for the event");
        }
        else{
            await PostCompetition.findOneAndUpdate({
                _id : req.body.event_id
            },{
                $addToSet:{
                    requests:req.body.user_id
                }
            }).then(()=>{
                console.log("abc")
            })

            await PostUser.findOneAndUpdate({
                _id : req.body.user_id
            },{
                $addToSet:{
                    events_applied :req.body.event_id
                }
            }).then(()=>{
                console.log("agrawal")
            }).catch(err => {
                console.log('err', err)
            })

            // eve[0].requests.push(req.body.user_id);
            // user[0].events_applied.push(req.body.event_id)
            // const a = await event.save();
            // const b = await users.save();
            res.json({
                code:0,
                message:"Successfully applied for the event"
            }) 
        }
    }
    
}