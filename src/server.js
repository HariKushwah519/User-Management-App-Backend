const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route")

const app = express();

app.use(express.json()); // Middleware
app.use("/", route); // Middleware

// Batabase Connection

mongoose.connect(
    "mongodb+srv://harikushwah519:dKJ653fvjjChiNPY@cluster0.kiovfe6.mongodb.net/UserManagement"
  )
  .then(() => console.log("MongooseDB Connected"))
  .catch(() => console.log("MongooseDB Connection Failed"));

// Creating Server

app.get("/", (req, res) => {
  res.send("Hello From Express Js");
});

let PORT = 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running at Port ${PORT}`);
  }
});
