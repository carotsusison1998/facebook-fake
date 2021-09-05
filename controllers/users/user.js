// const db = require("../../connect");
const Accounts = require("../../models/account");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

const Postedit = async (req, res, next) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Avatar')
    if(req.method === 'POST'){
        const urls = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            const userUpdate = await Accounts.findByIdAndUpdate(req.session.User._id, {"$set": {"avatar": newPath.url }});
            req.session.avatar = newPath.url;
            fs.unlinkSync(path);
        }
        return res.redirect('back');
    }else{
        res.status(405).json({
            message: "upload ko thành công",
        })
    }
}
// const PostsignIn = async (req, res, next) => {
    // const uploader = async (path) => await cloudinary.uploads(path, 'Images')
    // if(req.method === 'POST'){
    //     const urls = [];
    //     const files = req.files;
    //     for(const file of files){
    //         const {path} = file;
    //         const newPath = await uploader(path);
    //         urls.push(newPath);
    //         console.log(newPath);
    //         fs.unlinkSync(path);
    //     }
    //     res.status(200).json({
    //         message: "upload thành công",
    //         data: urls
    //     })
    // }else{
    //     res.status(405).json({
    //         message: "upload ko thành công",
    //     })
    // }

    // const sqlCheckLogin = "SELECT * FROM tbl_accounts WHERE username = '"+req.body.username+"' AND password = '"+req.body.password+"' LIMIT 1";
    // db.connect().query( sqlCheckLogin, function(error, result){
    //     if (error) {
    //         console.log(error);
    //         res.status(400).send(error);
    //     }else{
    //         req.session.User = {
    //             name: result.rows[0].name,
    //             email: result.rows[0].email,
    //             avatar: result.rows[0].avatar
    //         }
    //         return res.redirect('/');
    //     }
    // })
// }


module.exports = {
    Postedit
};
