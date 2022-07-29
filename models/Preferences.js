const mongoose = require('mongoose');
const { Schema } = mongoose;

const PrefernceSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    like: {
        type: Boolean,
        default: false
    },
    dislike: {
        type: Boolean,
        default: false
    },
    favourite: {
        type: Boolean,
        default: false
    }, 
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
    }
})

module.exports = mongoose.model('preferences', PrefernceSchema);