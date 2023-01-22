const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    event_name : String,
    team_size: Number,
    details: String,
    requests: [String],
    selected: [String]
});

const PostCompetition = mongoose.model('PostCompetition', postSchema);
module.exports = PostCompetition;