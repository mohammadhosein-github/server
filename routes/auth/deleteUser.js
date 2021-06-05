const User = require("../../models/user");

const deleteUser = async (req, res) => {
  //CHECK IF USER EXIST AND DELETE
  try {
    const deletedUser = await User.findOneAndDelete({ _id: res.user.id });
    if (!deletedUser)
      return res.status(400).json({ message: "Authentication failed" });

    res.json({ message: "User deleted successfully", result: deletedUser });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteUser;
