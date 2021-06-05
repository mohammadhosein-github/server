const User = require("../../models/user");
const authValidation = require("../../models/validationModels/authValidation");

const updateUser = async (req, res) => {
  const reqParamsArr = Object.keys(req.body);

  //CHECK IF BODY IS EMPTY
  if (req.body.constructor === Object && reqParamsArr.length === 0)
    return res.status(400).json({ message: "Empty request body" });

  //DATA VALIDATION: USERNAME / PHONE NUMBER / ADDRESS
  const { error } = authValidation.userInfo(req.body);
  if (error) return res.status(403).json({ message: error.message });

  //LOWERCASE USERNAME
  req.body.username = req.body.username.toLowerCase();

  //CHECK IF USERNAME IS ALREADY TAKEN
  if (reqParamsArr.includes("username")) {
    try {
      const userExist = await User.findOne({ username: req.body.username });
      if (userExist)
        return res.status(403).json({ message: "username is already taken." });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  //UPDATE USER INFO IN DB
  try {
    const user = await User.findOneAndUpdate(
      { _id: res.user.id },
      { ...req.body }
    );

    if (!user)
      return res.status(401).json({ message: "Authentication Failed." });

    res.json({ message: "info updated" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = updateUser;
