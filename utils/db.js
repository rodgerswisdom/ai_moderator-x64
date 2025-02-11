const models = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
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

const User = mongoose.model('User', userSchema);
