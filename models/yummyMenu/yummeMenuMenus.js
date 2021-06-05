const mongoose = require("mongoose");

const yummyMenuMenusModel = new mongoose.Schema({
  restaurantName: {
    type: String,
    min: 4,
    max: 65,
    required: true,
  },
  restaurantMenu: [
    {
      title: {
        type: String,
        min: 4,
        max: 40,
        required: true,
      },
      description: {
        type: String,
        min: 20,
        max: 200,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        max: 150,
        required: true,
      },
      type: {
        type: String,
        min: 3,
        max: 40,
        required: true,
      },
      category: {
        type: String,
        min: 3,
        max: 40,
        required: true,
      },
      orderedTimes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("YummyMenuMenus", yummyMenuMenusModel);
