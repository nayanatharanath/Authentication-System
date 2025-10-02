const User = require("../models/user.js");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
  } catch (err) {
    console.log("SIGN UP: ", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

module.exports = signUp;
