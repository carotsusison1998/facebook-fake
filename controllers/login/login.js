// const db = require("../../connect");
const Accounts = require("../../models/account");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

const GetsignIn = async (req, res, next) => {
    if(req.session.User){
        return res.redirect('/');
    }else{
        res.render('users/login');
    }
}
const PostsignIn = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await Accounts.findOne({ "username": username, "password": password}, "_id name email active avatar");    
    if(user){
        req.session.User = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            active: user.active,
        }
        req.session.avatar = user.avatar
        await Accounts.findByIdAndUpdate(user._id, {"$set": {"active": true }});
    }
    return res.redirect('/');
}
const test = async (req, res, next) => {
    console.log(req.session.User);
}


module.exports = {
    GetsignIn,
    PostsignIn,
    test
};
