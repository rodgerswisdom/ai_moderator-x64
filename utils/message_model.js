const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message:{
        type: String
    },
    chat_response:{
        type: String
    }
});

module.exports = mongoose.model('Message', messageSchema);
