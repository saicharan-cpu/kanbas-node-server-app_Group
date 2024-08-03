import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: String,
  quizID: { type: String, required: true },
  points: Number,
  questionVal: String,
  questionType: {
    type: String,
    enum: ['Multiple Choice', 'True/False', 'Fill in the Blanks'],
    default: 'Multiple Choice'
  },
  choices: [{
    text: String,
    isCorrect: Boolean
  }],
  trueFalse: Boolean,
  blanks: [{
    answer: String
  }],
}, { collection: 'questions' });

export default questionSchema;
