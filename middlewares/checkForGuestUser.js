const checkForGuestUser = (req, res, next) => {
  //CHECK IF TARGET USER IS GUEST USER
  if (res.user.id === "60326838c2fc7c03dc0be81f")
    return res.status(403).json({ message: "guest user can not be modified" });

  next();
};

module.exports = checkForGuestUser;
