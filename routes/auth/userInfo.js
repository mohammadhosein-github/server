const User = require("../../models/user");

const userInfo = async (req, res) => {
  //CHECK IF USER EXIST
  try {
    const user = await User.findOne({ _id: res.user.id });
    if (!user) return res.status().json({ message: "Authentication failed." });

    //RETURN USER INFO
    const { role, email, username, phone_number, address } = user;
    res.json({
      role,
      email,
      username,
      phone_number,
      address,
    });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = userInfo;
