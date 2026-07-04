let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose').default;

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);