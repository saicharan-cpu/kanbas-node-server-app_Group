import QuizModel from './model.js';
import QuestionModel from '../Questions/model.js'; // Import the Question model

export const findquizesForCourse = async (courseId) => {
  try {
    console.log(`Finding quizzes for course ID: ${courseId}`);
    const quizzes = await QuizModel.find({ courseId: courseId }).populate('questions').lean();
    console.log(`Quizzes found: ${quizzes.length}`);
    return quizzes;
  } catch (error) {
    console.error(`Error finding quizzes for course ID ${courseId}:`, error);
    throw error;
  }
};

export const findQuiz = (id) => QuizModel.findById(id).populate('questions');

export const createQuiz = (cid, quiz) => {
  delete quiz._id;
  quiz.courseId = cid;
  return QuizModel.create(quiz);
};

export const updateQuiz = (id, quiz) => {
    console.log("uodate quizz in dao");
    return QuizModel.updateOne({ _id: id }, { $set: quiz });
};

export const deleteQuiz = (id) => QuizModel.deleteOne({ _id: id });
