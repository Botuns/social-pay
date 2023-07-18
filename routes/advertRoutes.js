const express = require('express');
const {
  createAdvert,
  approveAdvert,
  getAllUnapprovedAdverts,
  getAllApprovedAdverts,
  rejectAdvert,
  getUserAdverts,
  getApprovedUserAdverts
} = require('../controllers/advertController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to create a new advert
router.post('/advert/newadvert', authMiddleware, createAdvert);

// Route to approve an advert by ID
router.put('/advert/approve/:id', authMiddleware, approveAdvert);

// Route to get all unapproved adverts
router.get('/advert/unapproved', authMiddleware, getAllUnapprovedAdverts);

// Route to get all approved adverts
router.get('/advert/approved', authMiddleware, getAllApprovedAdverts);

// Route to reject an advert by ID
router.put('/advert/reject/:id', authMiddleware, rejectAdvert);

// Route to get a user's adverts
router.get('/advert/user', authMiddleware, getUserAdverts);

// Route to get approved user's adverts
router.get('/advert/user/approved', authMiddleware, getApprovedUserAdverts);

module.exports = router;
