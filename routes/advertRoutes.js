const express = require('express');
const {createAdvert, ApproveAdvert} = require('../controllers/advertController');
const {authMiddleware}= require('../middlewares/authMiddleware');
const router = express.Router();


//routes to create a new user
router.post('/advert/newadvert',authMiddleware,createAdvert);
router.put('/advert/approve/:id',authMiddleware,ApproveAdvert)

module.exports = router;