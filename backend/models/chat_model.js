const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    studentId:{
        type:String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    response:{
        type: String
    }
})

module.exports = mongoose.model('Chats', chatSchema);