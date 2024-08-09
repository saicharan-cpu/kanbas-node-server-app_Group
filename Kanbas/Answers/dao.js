import mongoose from 'mongoose';
import AnswerModel from './model.js';


export const createAnswer = (questionId, answer) => {
  const newAnswer = {
    questionId: questionId,
    quizId: answer.quizId,
    answers: Array.isArray(answer.answer) ? answer.answer.map(String) : [String(answer.answer)], // Ensure it's an array of strings
    userId: answer.userId,
    score: answer.score,
  };
  newAnswer._id = new mongoose.Types.ObjectId();
  console.log("CREATE", newAnswer.answers);

  return AnswerModel.create(newAnswer);
};

export const updateAnswer = async (userId, questionId, answer) => {
  console.log("Updating in dao: ", answer);
  try {
    await AnswerModel.deleteOne({ userId: userId, questionId: questionId });
    const newAnswer = {
      quizId: answer.quizId,
      userId: userId,
      answers: Array.isArray(answer.answer) ? answer.answer.map(String) : [String(answer.answer)], // Ensure it's an array of strings
      questionId: questionId,
      score: answer.score,
      attemptNumber: answer.attemptNumber,
      submittedAt: new Date(),
    };

    const createdAnswer = await AnswerModel.create(newAnswer);
    console.log("Answer saved in dao: ", createdAnswer.answers);
  } catch (error) {
    console.error("Error updating answer in dao:", error);
  }
};


export const fetchAnswer = (userId, questionId) => {
    
  return AnswerModel.findOne({ userId, questionId });
};

export const fetchAllAnswersForQuiz = (userId, quizId) => {
  return AnswerModel.find({ userId, quizId });
};
