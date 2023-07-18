const express = require('express');
const {createUser,loginUser,verifyUser} = require('../controllers/userController');
const router = express.Router();


//routes to create a new user
router.post('/user/auth/register',createUser);
// routes to llogin a user
router.post('/user/auth/login',loginUser);

// verifies user
router.post('/user/verify',verifyUser );



module.exports = router;