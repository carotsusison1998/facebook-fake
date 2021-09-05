// const db = require("../../connect");
const mongoose = require('mongoose');
const session = require('express-session');
const cloudinary = require("../../cloudinary");
const fs = require("fs");
const Post = require("../../models/post");
const ImgPost = require("../../models/img_post");
const Account = require("../../models/account");
const MessageAll = require("../../models/message_all");

const Getindex = async (req, res, next) => {
    let arrpost = "";
    await Post.aggregate([
        {
            $lookup: {
                from: 'tbl_image_posts',
                foreignField: 'id_post',
                localField: '_id',
                as: 'postList'
            }
        },
        {
            $lookup: {
                from: 'tbl_accounts',
                foreignField: '_id',
                localField: 'id_user',
                as: 'postUser'
            }
        },
        { $sort : { _id : -1 } }
    ],function(err,resss){
        if (err) throw err;
        arrpost = resss;
    });
    // const list_account = await Account.find({});
    
    const list_account = await Account.find({ _id: { $nin: req.session.User._id } });
    res.render('index', {info: req.session.User, arrpost: arrpost, list_account: list_account});
}

const Postindex = async (req, res, next) => {
    
}

module.exports = {
    Getindex,
    Postindex
};
