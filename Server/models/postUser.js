const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please fill a valid email address']
    },
    password: {
        type:String,
        required:true
    },
    events_applied: {
        type: [String],
        default:[]
    },
    events_posted: {
        type: [String],
        default:[]
    },
    events_applied_approved: {
        type: [String],
        default:[]
    },
    events_posted_formed: {
        type: [String],
        default:[]
    }
});


const PostUser = mongoose.model('PostUser', postSchema);
module.exports = PostUser;