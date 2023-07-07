const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  advertType: {
    type: String,
    enum: ['Facebook', 'Twitter', 'Instagram', 'Threads', 'YouTube', 'TikTok', 'WebsiteUrl', 'AppDownload', 'Telegram', 'Audiomack'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
    price:{
    type: Number,
    required: true,
    },
    isApproved: {
    type: Boolean,
    default: false
    },
    location:{
    type: String,
    required: true
    },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Other fields specific to your advert model
});

const Advert = mongoose.model('Advert', AdvertSchema);

module.exports = Advert;
