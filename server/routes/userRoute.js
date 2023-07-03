const express = require('express');
const {
    //addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    LoginUser

} = require('../controller/usercontroller');

const router = express.Router();
//router.post("/user", addUser);
router.post("/login", LoginUser)
router.get("/user/:phone_number", getUser);
router.get("/users", getAllUsers);
router.put("/user/:phone_number", updateUser);
router.delete("/user/:phone_number", deleteUser);

module.exports = {
    routes: router,
}