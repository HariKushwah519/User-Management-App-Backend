const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");
// const validation = require("./validator");
const {isValid, isValidName, isValidEmail, isValidContact } = require("./validator");

        // Add User Data

const addUser = async (req, res) => {
    try {
        const userData = req.body;

        if(Object.keys(userData).length === 0) {
            return res.status(400).json ({msg: "Bad Request, No Data Provided"});
        }

        const {userName, userEmail, userContact, userAddress, gender, age} = userData;

        // User Name Validation

        if(!isValid(userName)) {
            return res.status(400).json({msg: "User Name is Required"});
        }

        if (!isValidName(userName)) {
            return res.status(400).json({msg: "Invalid user Name"});
        }

        // User Email Validation

        if (!isValid(userEmail)) {
            return res.status(400).json({msg: "User Email is Required"});
        }

        if (!isValidEmail(userEmail)) {
            return res.status(400).json({msg: "Invalid user Email"});
        }

        let duplicateEmail = await userModel.findOne({userEmail})
        if (duplicateEmail) {
            return res.status(400).json({msg: "Email Already Exists"})
        }

        // User Contact Validation

        if (!isValid(userContact)) {
            return res.status(400).json({msg: "User Contact is Required"});
        }

        if (!isValidContact(userContact)) {
            return res.status(400).json({msg: "Invalid user Contact"});
        }

        let duplicateContact = await userModel.findOne({userContact})
        if (duplicateContact) {
            return res.status(400).json({msg: "Contact Number is Already Exists"})
        }

        // User Address Validation

        if (!isValid(userAddress)) {
            return res.status(400).json({msg: "User Address is Required"});
        }

        // User Gender Validation

        if (!isValid(gender)) {
            return res.status(400).json({msg: "User Gender is Required"});
        }

        // User Age Validation

        if (!isValid(age)) {
            return res.status(400).json({msg: "User Age is Required"});
        }


        let user = await userModel.create(userData);
        return res.status(201).json({msg: "User Data Addeds Successfully", user });


    } catch (error) {
        console.log(error);
        
        return res.status(500).json({msg: "Internal Server Error" });
    }
};

        // Get All UserData

        const getUsers = async (req, res) => {
            try {
                let userData = await userModel.find();
                return res.status(200).json({ userData });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ msg: "Internal server Error", error });
            }
        };

        // Update User 
        
        const updateUser = async (req, res) => {
            try {
                let UserId = req.params.id;
                let data = req.body;

                if(!mongoose.Types.ObjectId.isValid(UserId)) {
                    return res.status(400).json({msg: "Invalid User Id"})
                }

                if(Object.keys(data).length === 0) {
                    return res.status(400).json({msg: "Bad Request, No Data Provided" });
                }

                let {userName, userEmail, userContact, userAddress, gender, age} = data;

        // Validate userName
        if (userName !== undefined) {
            if (!isValid(userName)) {
                return res.status(400).json({ msg: "User Name is Required" });
            }

            if (!isValidName(userName)) {
                return res.status(400).json({ msg: "Invalid User Name" });
            }
        }

        // Validate User Email
        if (userEmail !== undefined) {
            if (!isValid(userEmail)) {
                return res.status(400).json({ msg: "User Email is Required" });
            }

            if (!isValidEmail(userEmail)) {
                return res.status(400).json({ msg: "Invalid User Email" });
            }

            let duplicateEmail = await userModel.findOne({ userEmail });
            if (duplicateEmail) {
                return res.status(400).json({ msg: "Email Already Exists" });
            }
        }

        // Validate user Contact
        if (userContact !== undefined) {
            if (!isValid(userContact)) {
                res.status(400).json({ msg: "User Contact is Required" });
            }

            if (!isValidPhone(userContact)) {
                return res.status(400).json({ msg: "Invalid User Contact" });
            }

            let duplicateContact = await userModel.findOne({ userContact });
            if (duplicateContact) {
                return res.status(400).json({ msg: "User Contact Already Exists" });
            }
        }

        // Validate user Address
        if (userAddress !== undefined && !isValid(userAddress)) {
            return res.status(400).json({ msg: "User Address is Required" });
        }

        // validate Gender
        if (gender !== undefined && !isValid(gender)) {
            return res.status(400).json({ msg: "Gender is Required" });
        }

        // validate Age
        if (age !== undefined && !isValid(age)) {
            return res.status(400).json({ msg: "Age is Required" });
        }

        let update = await userModel.findByIdAndUpdate(userId, data, { new: true });
        return res.status(200).json({ msg: "User Data Updated Successfully", update });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

        // Get By Gender

        const getUserByGender = async (req, res) => {
            try {
                const gender = req.quegry.gender;

                if (!isValid(gender)) {
                    return res.status(400).json({msg: "Gender is Required"})
                }

                const users = await userModel.find({gender: gender.toLowerCase() });

                if (users.length === 0) {
                    return res.status(404).json({msg: "No User Found"})
                }
                return res.status(200).json({users});
            } catch (error) {
                console.log(error);
                return res.status(500).json({msg: "Internal Server Error"})
            }
        }

        // Delete User Data

        const deleteUser = async (req, res) => {
            try {
                let UserId =req.params.id;
                let deleteUserById = await userModel.findByIdAndDelete(UserId);
                if(!deleteUserById) {
                    return res.status(404).json({msg: "Ueer Not Found"});
                }
                return res.status(200).json({msg: "UserData Deleted Succesfully"});
            } catch (error) {
                console.log(error);
                
                return res.status(500).json({ msg: "Internal Server Error" });
                
            }
        }

        


module.exports = {addUser, getUsers, updateUser, getUserByGender ,deleteUser};