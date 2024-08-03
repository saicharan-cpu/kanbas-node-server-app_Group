import * as dao from "./dao.js";
import express from "express";
const router = express.Router();

const createQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questionType, ...question } = req.body; // Extract questionType and other fields
    const createdQuestion = await dao.createQuestion(quizId, {
      ...question,
      questionType: questionType
    });
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await dao.findQuestion(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getQuestionsForQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await dao.findQuestionByQuiz(quizId);
    res.status(200).json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const question = req.body;
  try {
    const updatedQuestion = await dao.updateQuestion(id, question);
    res.json(updatedQuestion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

router.post('/api/quizzes/:quizId/questions', createQuestion);
router.put('/api/quizzes/:quizId/questions/:id', updateQuestion);
router.get('/api/quizzes/:quizId/questions/:id', getQuestion);
router.get('/api/quizzes/:quizId/questions', getQuestionsForQuiz);

export default router;
