const PostCompetition = require('../models/postCompetition');
const PostUser = require('../models/postUser');

module.exports = async (req, res)=>{

    const events = await PostCompetition.find();
    const eve = events.filter(even => {
        return even._id == req.body.event_id
    })
    
    const users = await PostUser.find();
    
    const user = users.filter(uses => {
        return uses._id == req.body.user_id
    })
    
    if(eve[0].selected.length < eve[0].team_size){
        if(user[0].events_applied.includes(req.body.event_id)){
            await PostUser.findOneAndUpdate({
                _id : req.body.user_id
            },{
                $addToSet:{
                    events_applied_approved:req.body.event_id
                },
                $pull:{
                    events_applied:req.body.event_id
                }
            }).then(()=>{
                res.json({
                    code:11,
                    message:"Your requested has been accepted"
                })
            })

            await PostCompetition.findOneAndUpdate({
                _id : req.body.event_id
            },{
                $addToSet:{
                    selected:req.body.user_id
                },
                $pull:{
                    requests:req.body.user_id
                }
            }).then(async () =>{
                if(eve[0].selected.length +1 == eve[0].team_size){
                    await PostUser.findOneAndUpdate({
                        _id : eve.user_id
                    },{
                        $addToSet:{
                            events_posted_formed:req.body.event_id
                        },
                        $pull:{
                            events_posted:req.body.event_id
                        }
                    }).then(()=>{
                        
                        res.json({
                            code:13,
                            message:"Team successfully formed"
                        })
                    })
                }
            })
        }
        else{
            res.json({
                code:-20,
                message:"User has not applied for the event"
            })
        }
    }
    else{

    }


   
    
}