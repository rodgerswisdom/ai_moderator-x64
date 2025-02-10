const models = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  email: String,
  password: String,
  major: {
      Subject: String,
      Subjects: []
  },
  group: String
});
