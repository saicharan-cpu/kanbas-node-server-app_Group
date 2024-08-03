import mongoose from 'mongoose';
import questionSchema from './schema.js';

const QuestionModel = mongoose.model('Question', questionSchema);
export default QuestionModel;
