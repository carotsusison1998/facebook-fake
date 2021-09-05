// const db = require("../../connect");
const cloudinary = require("../../cloudinary");
const fs = require("fs");
const Post = require("../../models/post");
const ImgPost = require("../../models/img_post");

const Postinsert = async (req, res, next) => {
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes();
    const objectPost = {
        id_user : req.body.id_user,
        content: req.body.contentpost,
        post_date: date
    }
    // await Post.collection.dropIndexes("date_post.email_1");
    const newPost = new Post(objectPost);
    await newPost.save();
    if(newPost._id){
        const uploader = async (path) => await cloudinary.uploads(path, 'Posts');
        const urls = [];
        for (const file of req.files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            const objectImage = {
                id_post : newPost._id,
                url: newPath.url,
                post_date: date
            }
            console.log(objectImage);
            const image_post = new ImgPost(objectImage);
            await image_post.save();
            fs.unlinkSync(path);
        }
    }
    return res.redirect('back');
}
const up = async (files) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Posts');
    const urls = [];
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        // const sqlInsertImage = "INSERT INTO tbl_image_post(id_post, url) VALUES (" + result.rows[0].id + ", '" + newPath.url + "')";
        // db.connect().query(sqlInsertImage, function (error, result) {
        //     if (error) {
        //         res.status(400).send(error);
        //     }
        // });
        fs.unlinkSync(path);
    }
    return urls;
}

module.exports = {
    Postinsert
};
