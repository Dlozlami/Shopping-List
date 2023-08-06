const mongoose = require("mongoose");
const { Schema } = mongoose;

const listItemSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  quantity: { type: Number },
  name: { type: String },
  price: { type: Number },
  totalPrice: { type: Number },
});

const shoppingListSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  list_name: { type: String, required: true },
  user_email: { type: String, required: true },
  items: [listItemSchema],
  timestamp: { type: Date, default: Date.now },
  total: { type: Number },
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
