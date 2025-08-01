const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Execute query with pagination
    const videos = await Video.find(query)
      .sort({ isFeatured: -1, sortOrder: 1, publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    // Get total count for pagination
    const count = await Video.countDocuments(query);
    
    res.json({
      success: true,
      data: videos,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching videos' 
    });
  }
});

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ 
        success: false, 
        error: 'Video not found' 
      });
    }
    
    // Increment views
    video.views += 1;
    await video.save();
    
    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching video' 
    });
  }
});

// @desc    Create new video
// @route   POST /api/videos
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const video = await Video.create(req.body);
    
    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!video) {
      return res.status(404).json({ 
        success: false, 
        error: 'Video not found' 
      });
    }
    
    res.json({
      success: true,
      data: video
    });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    
    if (!video) {
      return res.status(404).json({ 
        success: false, 
        error: 'Video not found' 
      });
    }
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error deleting video' 
    });
  }
});

// @desc    Toggle video like
// @route   POST /api/videos/:id/like
// @access  Private
router.post('/:id/like', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ 
        success: false, 
        error: 'Video not found' 
      });
    }
    
    // For now, just increment likes count
    // In a real app, you'd track user likes
    const userId = req.user?.id || 'anonymous';
    const likeIndex = video.likes.indexOf(userId);
    
    if (likeIndex > -1) {
      video.likes.splice(likeIndex, 1);
    } else {
      video.likes.push(userId);
    }
    
    await video.save();
    
    res.json({
      success: true,
      data: {
        likes: video.likes.length,
        isLiked: likeIndex === -1
      }
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error toggling like' 
    });
  }
});

module.exports = router;
