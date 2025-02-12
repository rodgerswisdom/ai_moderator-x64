const models = require('mongoose');

const Schema = models.Schema;
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
  group: {
      type: String
  }
});

const User = models.model('User', UserSchema);
