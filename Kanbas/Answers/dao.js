import mongoose from 'mongoose';
import AnswerModel from './model.js';


export const fetchAnswer = (userId, questionId) => {
    
  return AnswerModel.findOne({ userId, questionId });
};

export const fetchAnswersForQuiz = (userId, quizId) => {
  return AnswerModel.find({ userId, quizId });
};


export const createAnswer = (questionId, answer) => {
  const newAnswer = {
    questionId: questionId,
    quizId: answer.quizId,
    answers: Array.isArray(answer.answer) ? answer.answer.map(String) : [String(answer.answer)], 
    userId: answer.userId,
    score: answer.score,
  };
  newAnswer._id = new mongoose.Types.ObjectId();

  return AnswerModel.create(newAnswer);
};

export const updateAnswer = async (userId, questionId, answer) => {
  try {
    await AnswerModel.deleteOne({ userId: userId, questionId: questionId });
    const newAnswer = {
      quizId: answer.quizId,
      userId: userId,
      answers: Array.isArray(answer.answer) ? answer.answer.map(String) : [String(answer.answer)], 
      questionId: questionId,
      score: answer.score,
      attemptNumber: answer.attemptNumber,
      submittedAt: new Date(),
    };

    const createdAnswer = await AnswerModel.create(newAnswer);
  } catch (error) {
    console.error("Error updating answer in dao:", error);
  }
};