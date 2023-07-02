const PostCompetition = require("../models/postCompetition");
const postUser = require("../models/postUser");

const get_competition = async(req,res) => {
    PostCompetition.find({_id:req.body.competitionId})
    .exec()
    .then(competitions => {
        if(competitions.length  < 1){
            return res.status(404).json({
                message:"No competition for the given Id"
            });
        }
        return res.status(200).json(competitions[0]);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
}

const get_user_competition = async(req,res) => {
    PostCompetition.find({user_id:req.body.user_id})
    .exec()
    .then(competitions => {
        if(competitions.length  < 1){
            return res.status(404).json({
                message:"No competitions posted by the user"
            });
        }
        return res.status(200).json(competitions);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    })
}

const post_competition = async(req,res) => {

    const newCompetition = new PostCompetition({
        user_id : `${req.userData.userId}`,
        event_name : req.body.event_name,
        team_size : req.body.team_size,
        details : req.body.details,
        requests : [],
        selected : []
    });

    newCompetition.save()
    .then(result => {

        postUser.findOneAndUpdate(
            {email:req.userData.email},
            {
                $addToSet:{
                    events_posted : newCompetition._id
                }
            }
        ).exec()
        .then(resu => {
            res.status(201).json({
                message:"Competition Posted"
            })
        })        
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });

}

module.exports = {
    post_competition,
    get_competition,
    get_user_competition
}