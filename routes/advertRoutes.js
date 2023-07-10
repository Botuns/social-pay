const express = require('express');
const {createAdvert} = require('../controllers/advertController');
const {authMiddleware}= require('../middlewares/authMiddleware')
const router = express.Router();


//routes to create a new user
router.post('/advert/newadvert',authMiddleware,createAdvert);

module.exports = router;