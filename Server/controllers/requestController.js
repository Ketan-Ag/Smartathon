const { request } = require("express");
const PostCompetition = require("../models/postCompetition");
const PostUser = require("../models/postUser");

const post_a_request = async(req,res) => {

    PostCompetition.find({_id:req.body.competitionId})
    .exec()
    .then(competition => {
        if(competition.length < 1){
            return res.status(404).json({
                error : "No competition available to post a request"
            });
        }
        if(competition[0].user_id == req.userData.userId){
            return res.status(400).json({message:"You cannot request to join a competition created by yourself"})
        }
        const compit = competition[0].requests
        if(compit.indexOf({name:req.userData.name, email:req.userData.email}) === -1){
            compit.push({name:req.userData.name, email:req.userData.email});
        }else {
            return res.status(200).json({message:"Already applied"});
        }
        
        competition[0].save()
        .then(result => {

            PostUser.find({email:req.userData.email})
            .exec()
            .then(user => {
                if(user.length < 1){
                    return res.status(404).json({message:"No user found"})
                }
                if(user[0].events_applied.indexOf(req.body.competitionId) === -1){
                    user[0].events_applied.push(req.body.competitionId);
                }
                
                user[0].save()
                .then(resul => {
                    res.status(200).json({
                        message:"Successfully applied for the competition"
                    });
                }).catch(err1 => res.status(400).json({error : `err123, ${err1}`}))
            }).catch(err2 => res.status(400).json({error : `err23, ${err2}`}))
        })
    })
    .catch(err => {
        res.status(500).json({
            error:`err, , ${err}`
        });
    })

}

const accept_a_request = async(req,res) => {

    PostCompetition.find({_id:req.body.competitionId}).exec()
    .then(competitions => {
        if(competitions.length < 1){
            return res.status(404).json({error:"No competition found"});
        }
        const compi = competitions[0];
        const ab = compi.requests.filter(request1 => {
            return request1.name == req.body.name 
        })
        
        if(compi.requests.indexOf(ab[0]) === -1){
            return res.status(400).json({error:"User is not in the request list"})
        }
        compi.requests.splice( compi.requests.indexOf(ab[0]), 1 );
        compi.selected.push({name:req.body.name, email:req.body.email})

        compi.save()
        .then(resullt => {

            PostUser.find({name:req.body.name}).exec()
                .then(users => {
                    const user = users[0];
                    user.events_applied_approved.push(req.body.competitionId);
                    user.events_applied.splice( user.events_applied.indexOf(req.body.competitionId), 1);
                    user.save()
                    .then(resuu => {
                        if(compi.selected.length == (compi.team_size - 1) ){
                            PostUser.find({name:req.userData.name}).exec()
                            .then(users => {
                                const user = users[0];
                                user.events_posted.splice( user.events_posted.indexOf( req.body.competitionId ), 1);
                                user.events_posted_formed.push( req.body.competitionId );

                                user.save()
                                .then(r => {
                                    res.status(200).json({message:"Your Team is complete"})
                                })
                                .catch(err => {res.status(500).json({error:err})})

                            }).catch(err => {res.status(500).json({error:err})})
                        }else{
                            res.status(200).json({
                                message:`${req.body.name} is added in your team`
                            })
                        }
                    })
                    .catch(err => {res.status(500).json({error:err})})


                }).catch(err => {res.status(500).json({error:err})})


        })
        .catch(err => res.status(500).json({error:err}));

        

    })
}

module.exports = {
    post_a_request,
    accept_a_request
};