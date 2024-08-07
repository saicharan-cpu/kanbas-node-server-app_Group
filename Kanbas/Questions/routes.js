// import * as dao from "./dao.js";
 
// export default function QuestionsRoutes(app) {
 
//   const createQuestion = async (req, res) => {
//     const { quizId } = req.params;
//     try {
//       const question = await dao.createQuestion(quizId, req.body);
//       res.json(question);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
 
//   const deleteQuestion = async (req, res) => {
//     try {
//       const status = await dao.deleteQuestion(req.params.questionId);
//       res.json(status);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
 
//   const updateQuestion = async (req, res) => {
//     try {
//       const status = await dao.updateQuestion(req.params.questionId, req.body);
//       res.json(status);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
 
//   const findAllQuestionsByQuizId = async (req, res) => {
//     try {
//       const { quizId } = req.params;
//       const questions = await dao.findAllQuestionsByQuizId(quizId);
//       console.log(`Finding questions for quiz ID: ${quizId}`);
//       res.json(questions);
//     } catch (err) {
//       console.error(`Error finding questions: ${error.message}`);

//       res.status(500).send(err);
//     }
//   }
 
//   const findQuestionById = async (req, res) => {
//     try {
//       const question = await dao.findQuestionById(req.params.questionId);
//       if (question) {
//         res.json(question);
//       } else {
//         res.sendStatus(404);
//       }
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }

//   const getQuizDetails = async (req, res) => {
//   try {
//     const quizId = req.params.quizId;
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }
//     res.json(quiz);
//   } catch (error) {
//     console.error('Error fetching quiz details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

 
//   app.post("/api/quizzes/:quizId/questions", createQuestion);
//   app.delete("/api/questions/:questionId", deleteQuestion);
//   app.put("/api/questions/:questionId", updateQuestion);
//   app.get("/api/quizzes/:quizId/questions", findAllQuestionsByQuizId);
//   app.get("/api/questions/:questionId", findQuestionById);
//   app.get('/api/quizzes/:quizId', getQuizDetails); 
// }
 
import * as dao from "./dao.js";

export default function QuestionsRoutes(app) {

  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    try {
      const question = await dao.createQuestion(quizId, req.body);
      res.json(question);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  const deleteQuestion = async (req, res) => {
    try {
      const status = await dao.deleteQuestion(req.params.questionId);
      res.json(status);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  const updateQuestion = async (req, res) => {
    try {
      const status = await dao.updateQuestion(req.params.questionId, req.body);
      res.json(status);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  const findAllQuestionsByQuizId = async (req, res) => {
    try {
      const { quizId } = req.params;
      const questions = await dao.findAllQuestionsByQuizId(quizId);
      res.json(questions);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  const findQuestionById = async (req, res) => {
    try {
      const question = await dao.findQuestionById(req.params.questionId);
      if (question) {
        res.json(question);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.delete("/api/questions/:questionId", deleteQuestion);
  app.put("/api/questions/:questionId", updateQuestion);
  app.get("/api/quizzes/:quizId/questions", findAllQuestionsByQuizId);
  app.get("/api/questions/:questionId", findQuestionById);
}
