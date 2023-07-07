const express = require('express');
const {createUser} = require('../controllers/userController');
const router = express.Router();


//routes to create a new user
router.post('/user/auth/createuser',createUser);

module.exports = router;