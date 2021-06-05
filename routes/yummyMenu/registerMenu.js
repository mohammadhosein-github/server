const MenuModel = require("../../models/yummyMenu/yummeMenuMenus");
const yummyMenuValidation = require("../../models/validationModels/yummyMenu");

const registerMenu = async (req, res) => {
  //REQ BODY VALIDATION
  const { error } = yummyMenuValidation.yummyMenuMenus(req.body);

  if (error) return res.status(403).json({ message: error.message });

  const newMenu = new MenuModel({
    restaurantName: req.body.restaurantName,
    restaurantMenu: req.body.restaurantMenu,
  });

  try {
    const savedMenu = await newMenu.save();
    res.json({ result: savedMenu });
  } catch {
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = registerMenu;
