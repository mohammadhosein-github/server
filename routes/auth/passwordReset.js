const authValidation = require("../../models/validationModels/authValidation");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const passwordReset = async (req, res) => {
  //DATA VALIDATION
  const { error } = authValidation.passwordReset(req.body);
  if (error) return res.status(400).json({ message: error.message });

  if (req.body.password === req.body.newPassword)
    return res.status(400).json({ message: "New password is required." });

  //CHECK IF USER EXIST
  try {
    const user = await User.findOne({ _id: res.user.id });
    if (!user)
      return res.status(401).json({ message: "Authentication Failed." });

    //CHECK IF PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({ message: "Authentication Failed." });

    //HASH NEW USER PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    //SAVE NEW PASSWORD IN DATABASE
    const userWithNewPassword = await User.findOneAndUpdate(
      { _id: res.user.id },
      { password: hashedPassword }
    );
    if (!userWithNewPassword)
      return res.status(503).json({ message: "Something went wrong." });

    res.json({ message: "Password changed successfully." });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = passwordReset;
