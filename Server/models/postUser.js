const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
        unique:true
    },
    // email: {
    //     type: String,
    //     trim: true,
    //     lowercase: true,
    //     unique: true,
    //     required: 'Email address is required',
    //     validate: [validateEmail, 'Please fill a valid email address'],
    //     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    // },
    password: {
        type:String,
        required:true,
        unique:true
    },
    events_applied: [String],
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