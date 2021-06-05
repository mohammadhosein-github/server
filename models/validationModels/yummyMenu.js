const joi = require("joi");

const yummyMenuMenus = (data) => {
  const schema = joi.object({
    restaurantName: joi.string().min(4).max(65).required(),
    restaurantMenu: joi.array().items(
      joi.object({
        title: joi.string().min(4).max(40).required(),
        description: joi.string().min(20).max(200).required(),
        price: joi.number().required(),
        image: joi.string().max(150).required(),
        type: joi.string().min(3).max(40).required(),
        category: joi.string().min(3).max(40).required(),
        orderedTimes: joi.number(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = {
  yummyMenuMenus,
};
