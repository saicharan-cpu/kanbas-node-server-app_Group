
import * as dao from "./dao.js";
import mongoose from 'mongoose';

export default function QuizzesRoutes(app) {

  const findQuizzes = async (req, res) => {
    try {
      const quizzes = await dao.findQuizzes();
      res.json(quizzes);
    } catch (err) {
      console.error('Error finding all quizzes:', err);
      res.status(500).send(err);
    }
  };

  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(qid)) {
      return res.status(400).send("Invalid Quiz ID");
    }
    try {
     
      const quiz = await dao.findQuizById(qid);
      if (quiz) {
        res.json(quiz);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('Error finding quiz by ID:', err);
      res.status(500).send(err);
    }
  };

  const findQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    try {
      const quizzes = await dao.findQuizzesForCourse(cid);
      if (quizzes) {
        res.json(quizzes);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('Error finding quizzes for course:', err);
      res.status(500).send(err);
    }
  };

  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    try {
      const quiz = await dao.createQuiz(cid, req.body);
      res.json(quiz);
    } catch (err) {
      console.error('Error creating quiz:', err);
      res.status(500).send(err);
    }
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const status = await dao.deleteQuiz(qid);
      res.json(status);
    } catch (err) {
      console.error('Error deleting quiz:', err);
      res.status(500).send(err);
    }
  };



  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(qid)) {
      return res.status(400).send("Invalid Quiz ID");
    }
    try {
      const status = await dao.updateQuiz(qid, req.body);
      res.json(status);
    } catch (err) {
      console.error('Error updating quiz:', err);
      res.status(500).send(err);
    }
  };

  const checkAttempts = async (req, res) => {
    const { qid, userId } = req.params;
    try {
      const quiz = await dao.findQuizById(qid);
      const userAttempts = quiz.userAttempts.filter(id => id === userId).length;
      if (userAttempts < quiz.attempts) {
        res.status(200).send({ canAttempt: true,attempts: userAttempts});
      } else {
        res.status(200).send({ canAttempt: false,attempts:userAttempts });
      }
    } catch (err) {
      console.error('Error checking attempts:', err);
      res.status(500).send(err);
    }
  };


  app.get("/api/quizzes/:qid", findQuizById);
  app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
  app.get("/api/quizzes", findQuizzes);
  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);  
  app.get("/api/quizzes/:qid/check-attempts/:userId", checkAttempts);
}
