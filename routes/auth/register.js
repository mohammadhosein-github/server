const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authValidation = require("../../models/validationModels/authValidation");
const User = require("../../models/user");

const registerUser = async (req, res) => {
  //DATA VALIDATION
  const { error } = authValidation.register(req.body);
  if (error) return res.status(400).json({ message: error.message });

  //CHECK IF USER EXIST
  const userExist = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (userExist)
    return res.status(403).json({
      message: "a user with this email / username is already registered!",
    });

  //HASH USER PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //SAVE USER IN DATABASE
  const newUser = new User({
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();

    //GENERATE TOKEN
    const token = jwt.sign(
      { id: savedUser._id, username: savedUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "48h" }
    );

    res.status(201).json({ message: "User Registered.", token });
  } catch {
    return res
      .status(500)
      .json({ message: "something wet wrong! try again later." });
  }
};

module.exports = registerUser;
