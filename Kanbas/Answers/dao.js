import mongoose from 'mongoose';
import AnswerModel from './model.js';


export const createAnswer = (questionId, answer) => {
    const newAnswer = {
        questionId: questionId,
        quizId: answer.quizId,
        answers: answer.answer,
        userId: answer.userId,
        score: answer.score,

    }
    newAnswer._id = new mongoose.Types.ObjectId();
console.log("CREATE" + newAnswer.answers)

  return AnswerModel.create(newAnswer);
};

export const updateAnswer = (userId, questionId, answer) => {
    console.log("Updating in dao: " + answer)
    return AnswerModel.updateOne(
        { userId: userId, questionId: questionId },
        {
            $set: {
                answers: answer.answer,
            score: answer.score} },

    console.log("Answer in dao: " + answer.answer)
    // { upsert: true }
  );
};

export const fetchAnswer = (userId, questionId) => {
    
  return AnswerModel.findOne({ userId, questionId });
};

export const fetchAllAnswersForQuiz = (userId, quizId) => {
  return AnswerModel.find({ userId, quizId });
};
