const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    }

})
const Account = mongoose.model('tbl_accounts', AccountSchema)
module.exports = Account
    
