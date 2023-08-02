require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const https = require("https");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const ip = "10.255.66.152"; // change this to suit context
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect("mongodb://127.0.0.1:27017/shopping-list"); //Replace ****** with db name

//Routes for user authentication and authorization using JWT tokens

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

app.listen(8080, ip, function () {
  console.log(
    `Server started...\nClick the url to gain access: http://${ip}:8080/`
  );
});
