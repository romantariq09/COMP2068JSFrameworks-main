const mongoose = require("mongoose");

const passportLocalMongoosePackage = require("passport-local-mongoose");
const passportLocalMongoose =
  passportLocalMongoosePackage.default || passportLocalMongoosePackage;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;