const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    default: "John"
  },
  email: {
    type: String,
    index: { unique: true },
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Compare passwords when sign IN
UserSchema.methods.comparePassword = function comparePassword(
  password,
  callback
) {
  bcrypt.compare(password, this.password, callback);
};

// Use middleware before save to encrypt password
UserSchema.pre("save", function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified("password")) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

module.exports = User = mongoose.model("user", UserSchema);
