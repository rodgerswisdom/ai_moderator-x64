const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const RoleSchema = new Schema({
    permissions: {
        type: [String]
    },
});

module.exports = mongoose.model('user_roles', RoleSchema);
