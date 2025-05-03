const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: String,
  content: String,
  videoUrl: String,
  order: Number
});

module.exports = mongoose.model('Lesson', lessonSchema);
