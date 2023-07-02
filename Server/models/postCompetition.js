const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user_id : String,
    event_name : String,
    team_size: Number,
    details: String,
    requests: [{name: String, email:String}],
    selected: [{name: String, email:String}]
});

const PostCompetition = mongoose.model('PostCompetition', postSchema);
module.exports = PostCompetition;