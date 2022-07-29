const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minLength: 100,
        maxlength: 750
    },
    likes: {
        type: Number,
        default: 0
    }, 
    dislikes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('blogs', BlogSchema);