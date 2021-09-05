const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageAllSchema = new Schema({
    personSendId:{
        type: mongoose.Schema.ObjectId
    },
    personRecieveId:{
        type: mongoose.Schema.ObjectId
    },
    message:{
        type: String,
    },
    timeSendMessage:{
        type: String,
        required: true
    }
})
const MessageAll = mongoose.model('tbl_message_all', MessageAllSchema)
module.exports = MessageAll
    
