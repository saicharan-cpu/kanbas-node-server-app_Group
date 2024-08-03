import Question from './model.js';

export const createQuestion = (quizId, question) => {
  delete question._id;
  question.quizID = quizId;
  return Question.create(question);
};

export const deleteQuestion = (id) => Question.deleteOne({ _id: id });
export const updateQuestion = (id, question) => Question.updateOne({ _id: id }, { $set: question });
export const findQuestionsByType = (type, quizID) => Question.find({ questionType: type, quizID: quizID });
export const findQuestionByQuiz = (quizID) => Question.find({ quizID: quizID });
export const findQuestion = (id) => Question.findById(id);
