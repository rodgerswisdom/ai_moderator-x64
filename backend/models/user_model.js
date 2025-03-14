const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
  password: {
        type: String,
        required: true

  },
  major: {
      type: [String]
  },
  role: {
      type: String
  }
});

module.exports = mongoose.model('ai_user', UserSchema);
