const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aiModerationSchema = new Schema({
    assignmentId:{
        type: String
    },
    moderationRules:{
        type: [String]
    },
    flaggingRules:{
        type: [String]
    }
});