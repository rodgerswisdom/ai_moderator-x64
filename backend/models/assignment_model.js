const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    assignmentId:{
        type: String
    },
    assignmentName:{
        type: String
    },
    assignmentDescription:{
        type: String
    },
    assignmentDueDate:{
        type: Date
    },
    assignmentQuestions:{
        type: [String]
    },
    assignmentResponses:{
        type: [String]
    }
});

module.exports = mongoose.model('assignments', AssignmentSchema);