const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const RoleSchema = new Schema({
    __id: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String]
    },
});

module.exports = mongoose.model('user_roles', RoleSchema);
