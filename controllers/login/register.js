// const db = require("../../connect");
const Accounts = require("../../models/account");
const Getregister = async (req, res, next) => {
    res.render('users/register', {message: null})
}
const Postregister = async (req, res, next) => {
    const {email, name, username, password, avatar, active} = req.body;
    // check email co chua
    const foundEmail = await Accounts.findOne({ email });
    if(foundEmail){
        res.render('users/register', {message: "email đã tồn tại"});
    }else{
        const newUser = await new Accounts({email, name, username, password, avatar, active});
        newUser.save();
        res.render('users/register', {message: "thêm tài khoản thành công"});
    }
}


module.exports = {
    Getregister,
    Postregister
};
