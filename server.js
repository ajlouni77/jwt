require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const app = express();
const PORT = process.env.PORT || 5000;
const users = [];



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const jwt = require("jsonwebtoken");

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { username, password };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully" });
});
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, "your_secret_key", {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.json({ message: "Login successful" });
});
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

