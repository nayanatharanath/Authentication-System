// imports
const mongoose = require("mongoose");
const crypto = require("crypto");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "user",
    },
    reserPassword: {
      data: String, // to save the token as the data
      default: "",
    },
  },
  { timestamps: true }
);

/*
When user enters data(password), it will be stored in a plain text, in order to hash the data we are using the below code.
In set/get it is necessary to send a normal function, because of 'this' keyword
*/
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.hash_password = this.encryptedPassword(password);
    this.salt = this.makeSalt();
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    let authenticatePassword =
      this.encryptedPassword(plainText) === this.hash_password;
    return authenticatePassword;
  },
  encryptedPassword: function (password) {
    if (!password) return "";
    try {
      let encryptedData = crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
      return encryptedData;
    } catch (error) {
      return "";
    }
  },

  makeSalt: function () {
    let data = Math.round(new Date().valueOf() * Math.random()) + "";
    return data;
  },
};

module.exports = mongoose.model("User", userSchema);
