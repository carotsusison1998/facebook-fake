const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostImgSchema = new Schema({
    id_post:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    url:{
        type: String
    },
    post_date:{
        type: String,
    }
})
const ImgPost = mongoose.model('tbl_image_posts', PostImgSchema)
module.exports = ImgPost
    
