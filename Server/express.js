require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const https = require("https");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const ShoppingList = require("./models/shoppingList.model");
const ipa = "192.168.99.94";
const ip = "10.255.66.152"; // change this to suit context
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect("mongodb://127.0.0.1:27017/shopping-list"); //Replace ****** with db name

app.delete("/api/lists", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Missing _id in the request body" });
    }

    // Find the list by _id and delete it
    const deletedList = await ShoppingList.findByIdAndDelete(_id);

    // Check if the list was found and deleted
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    return res.status(200).json({ message: "List deleted successfully" });
  } catch (err) {
    console.error("Error deleting list:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/mylists/", async (req, res) => {
  //const userEmail = req.params.email;
  const { user_email } = req.body;
  console.log("Express.js line 47 user_email : ", user_email);
  try {
    // Fetch all shopping lists that have the userEmail in their user_email field
    const lists = await ShoppingList.find({ user_email: user_email });

    // Check if any lists were found
    if (lists.length === 0) {
      console.log("No lists for user email: ", user_email);
      return;
    }

    return res.status(200).json(lists);
  } catch (err) {
    console.error("Express.js line 59 Error fetching lists:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/lists/", async (req, res) => {
  try {
    // Fetch all shopping lists from the database
    const lists = await ShoppingList.find();
    return res.status(200).json(lists);
  } catch (err) {
    console.error("Error fetching lists:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/lists", async (req, res) => {
  try {
    const { list_name, user_email } = req.body;
    function toTitleCase(str) {
      let lower = str.toLowerCase();
      return lower.replace(/\b\w/g, (match) => match.toUpperCase());
    }
    // Create a new shopping list record with the provided name and email
    const newList = new ShoppingList({
      list_name: toTitleCase(list_name),
      user_email: user_email,
      total: 0,
    });

    // Save the new shopping list to the database
    await newList.save();

    return res
      .status(201)
      .json({ message: "Shopping list created successfully" });
  } catch (err) {
    console.error("Error creating shopping list:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { name, surname, email, password, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      phone,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log("enter login post");
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      console.log("wrong email");
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    // Compare the provided password with the user's hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("wrong password");
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    // Generate a JSON Web Token (JWT) with the user's email, name, and surname encoded
    const secretKey = process.env.JWT_SECRET_KEY;
    const payload = {
      email: user.email,
      name: user.name,
      surname: user.surname,
    };
    const token = jwt.sign(payload, secretKey);

    // Return the JWT as a response on successful login
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/api/listItem", async (req, res) => {
  try {
    const { listId, itemId, name, quantity, price, totalPrice } = req.body;

    // Check if listId, itemId, name, quantity, price, and totalPrice are provided
    if (!listId || !itemId || !name || !quantity || !price || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the request body" });
    }

    // Find the list by listId
    const shoppingList = await ShoppingList.findById(listId);

    // Check if the list was found
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    // Find the item to be updated in the shoppingList items array
    const itemToUpdate = shoppingList.items.find((item) => item._id == itemId);

    // Check if the item was found in the list
    if (!itemToUpdate) {
      return res.status(404).json({ message: "Item not found in the list" });
    }

    // Update the item properties with the provided data
    itemToUpdate.name = name;
    itemToUpdate.quantity = quantity;
    itemToUpdate.price = price;
    itemToUpdate.totalPrice = totalPrice;

    // Save the updated shopping list to the database
    await shoppingList.save();

    return res
      .status(200)
      .json({ message: "Item updated in the list successfully" });
  } catch (err) {
    console.error("Error updating item in the list:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/api/list/names", async (req, res) => {
  try {
    const { _id, list_name } = req.body;

    // Validate that both _id and list_name are provided
    if (!_id || !list_name) {
      return res
        .status(400)
        .json({ message: "Missing _id or list_name in the request body" });
    }

    // Convert list_name to title case (e.g., capitalize first letter of each word)
    let newName = list_name.toLowerCase();
    newName = newName.replace(/\b\w/g, (match) => match.toUpperCase());

    // Find the shopping list by _id
    const shoppingList = await ShoppingList.findById(_id);

    // Check if the shopping list was found
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    // Update the shoppingList's list_name with the new name
    shoppingList.list_name = newName;

    // Save the updated shopping list to the database
    await shoppingList.save();

    return res.status(200).json({ message: "List name updated successfully" });
  } catch (err) {
    console.error("Error updating list name:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/api/lists", async (req, res) => {
  try {
    const id = req.body[0];
    const newListItem = req.body[1];

    // Find the shopping list by id
    const shoppingList = await ShoppingList.findById(id);

    // Check if the shopping list was found
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    // Add the newListItem to the items list in the shoppingList
    shoppingList.items.push(newListItem);

    // Calculate the total price by iterating through items
    let totalPrice = 0;
    for (const item of shoppingList.items) {
      totalPrice += item.totalPrice;
    }

    // Update the shoppingList's total with the calculated totalPrice
    shoppingList.total = totalPrice;

    // Save the updated shopping list (including both the new item and total price) to the database
    await shoppingList.save();

    return res
      .status(200)
      .json({ message: "Item added to the shopping list successfully" });
  } catch (err) {
    console.error("Error adding item to shopping list:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a list by _id
app.delete("/api/list", async (req, res) => {
  try {
    const { _id } = req.body;

    // Check if _id is provided
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Missing _id in the request body" });
    }

    // Find the list by _id and delete it
    const deletedList = await ShoppingList.findByIdAndDelete(_id);

    // Check if the list was found and deleted
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    return res.status(200).json({ message: "List deleted successfully" });
  } catch (err) {
    console.error("Error deleting list:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an item from a list by _id
app.delete("/api/listItem", async (req, res) => {
  try {
    const { listId, itemId } = req.body;

    // Check if listId and itemId are provided
    if (!listId || !itemId) {
      return res
        .status(400)
        .json({ message: "Missing listId or itemId in the request body" });
    }

    // Find the list by listId
    const shoppingList = await ShoppingList.findById(listId);

    // Check if the list was found
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    // Find the index of the item to be deleted in the shoppingList items array
    const itemIndex = shoppingList.items.findIndex(
      (item) => item._id == itemId
    );

    // Check if the item was found in the list
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the list" });
    }

    // Remove the item from the shoppingList items array
    shoppingList.items.splice(itemIndex, 1);

    // Save the updated shopping list to the database
    await shoppingList.save();

    return res
      .status(200)
      .json({ message: "Item deleted from the list successfully" });
  } catch (err) {
    console.error("Error deleting item from the list:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(8080, ip, function () {
  console.log(
    `Server started...\nClick the url to gain access: http://${ip}:8080/`
  );
});
