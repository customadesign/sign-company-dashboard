const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getOwners,
  getOwner,
  getOwnerReviews,
  createOwnerReview,
  updateOwner,
  getOwnerStats
} = require('../controllers/ownerController');

// Public routes
router.get('/', getOwners);
router.get('/:id', getOwner);
router.get('/:id/reviews', getOwnerReviews);
router.get('/:id/stats', getOwnerStats);

// Protected routes
router.post('/:id/reviews', protect, createOwnerReview);
router.put('/:id', protect, updateOwner);

module.exports = router;
