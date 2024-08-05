import mongoose from 'mongoose';
 
const answerSchema = new mongoose.Schema({
  quizId: { type: String, ref: 'quizzes' },
    userId: { type: String , ref: 'users', required: true },
    answers: { type: String },
  questionId: {type: String, ref: 'questions'}, 
  score: { type: Number },
  attemptNumber: { type: Number},
  submittedAt: { type: Date, default: Date.now }
}, { collection: 'answers' });
export default answerSchema;