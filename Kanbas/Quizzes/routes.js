import * as dao from "./dao.js";
import express from "express";

const router = express.Router();

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
  console.log("getting the quizzes for course");
    try {
        const { cid } = req.params;
        const quizes = await dao.findquizesForCourse(cid);
        res.status(200).json(quizes);
    } catch (error) {
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
    console.log("Updating the quizz");
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

router.post("/api/courses/:cid/quizzes", createQuiz);
router.get("/api/courses/:cid/quizzes", getQuizesForCourse);
router.get("/api/quizzes/:qid/publish", publishQuiz);
router.get("/api/quizzes/:qid/unpublish", unpublishQuiz);
router.get("/api/quizzes/:qid", getQuiz);
router.put("/api/quizzes/:qid", updateQuiz);
router.delete("/api/quizzes/:qid", deleteQuiz);

export default function QuizRoutes(app) {
    app.use(router);
}
