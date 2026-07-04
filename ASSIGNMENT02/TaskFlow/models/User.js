let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose').default;

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);