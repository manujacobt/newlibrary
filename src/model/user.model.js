const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://userone:userone@fsd.qrnq0.mongodb.net/LIBRARYAPPretryWrites=true&w=majority'
);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' }
});

const Userdata = mongoose.model('userData', UserSchema);

module.exports = Userdata;
