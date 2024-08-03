import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const createQuiz = async (req, res) => {
    try {
      const { cid } = req.params;
      const quiz = await dao.createQuiz(cid, req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  const getQuizesForCourse = async (req, res) => {
    try {
      console.log("Called API for quizzes");
      const { cid } = req.params;
      console.log(`Course ID: ${cid}`);
      const quizes = await dao.findquizesForCourse(cid);
      console.log(`Quizzes fetched: ${quizes.length}`);
      res.status(200).json(quizes);
    } catch (error) {
      console.error(`Error fetching quizzes for course ID ${cid}:`, error);
      res.status(404).json({ message: error.message });
    }
  };

  const getQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid).populate("questions").exec();
      res.status(200).json(quiz);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    let quiz = req.body;
    try {
      quiz = await dao.updateQuiz(qid, quiz);
      res.json(quiz);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      await dao.deleteQuiz(qid);
      res.sendStatus(200);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  const publishQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      quiz.isPublished = true;
      await dao.updateQuiz(qid, quiz);
      res.status(200).json(quiz);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  const unpublishQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuiz(qid);
      quiz.isPublished = false;
      await dao.updateQuiz(qid, quiz);
      res.status(200).json(quiz);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.get("/api/courses/:cid/quizzes", getQuizesForCourse);
  app.get("/api/quizzes/:qid/publish", publishQuiz);
  app.get("/api/quizzes/:qid/unpublish", unpublishQuiz);
  app.get("/api/quizzes/:qid", getQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
}
