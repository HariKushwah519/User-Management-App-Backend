const express = require("express")
const Route = express.Router()

const {addUser, getUsers, updateUser,getUserByGender, deleteUser} = require("../controllers/userController");

Route.post("/addUser", addUser);
Route.get("/userDetails", getUsers);
Route.put("/updateUser/:id", updateUser);
Route.get("/getUserByGender", getUserByGender);
Route.delete("/deleteUser/:id", deleteUser);

module.exports = Route
