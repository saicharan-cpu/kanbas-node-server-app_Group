// Kanbas/Questions/schema.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    quizID: { type: String, required: true },
    points: { type: Number, required: true },
    questionVal: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['Multiple Choice', 'True/False', 'Fill in the Blanks'],
        default: 'Multiple Choice',
        required: true
    },
    choices: [{
        text: { type: String },
        isCorrect: { type: Boolean }
    }],
    trueFalse: { type: Boolean },
    blanks: [{
        answer: { type: String }
    }],
}, { collection: "questions" });

export default questionSchema;
