const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    id_user:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    content:{
        type: String
    },
    post_date:{
        type: String,
    },
    user_id: { type: mongoose.Schema.ObjectId, ref: 'Account' }
})
const Post = mongoose.model('tbl_posts', PostSchema)
module.exports = Post
    
