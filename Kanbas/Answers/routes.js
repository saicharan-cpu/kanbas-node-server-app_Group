import * as dao from './dao.js';

export default function AnswerRoutes(app) {
    const createAnswer = async (req, res) => {
        const { questionId }=  req.params;
    try {
      const answer = await dao.createAnswer(questionId, req.body);
      res.json(answer);
    } catch (error) {
        console.log("Error creating answers: ", error) 
      res.status(500).send(error.message);
    }
  };

  const updateAnswer = async (req, res) => {
      try {
          const { userId, questionId } = req.params;
                  console.log("Updating the answer for: " + userId)

      const status = await dao.updateAnswer(userId, questionId, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const fetchAnswer = async (req, res) => {
    try {
        const { userId, questionId } = req.params;
      const answer = await dao.fetchAnswer(userId, questionId);
        console.log("USER ID in fetch answer routes: " + userId)

        if (answer) {
        res.json(answer);
      } else {
        res.status(404).send('Answer not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const fetchAllAnswersForQuiz = async (req, res) => {
      try {
        console.log("Fetching answers")
      const { userId, quizId } = req.params;
      const answers = await dao.fetchAllAnswersForQuiz(userId, quizId);
      res.json(answers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  app.post('/api/answers/:questionId/answers', createAnswer);
  app.put('/api/answers/:userId/:questionId/stored', updateAnswer);
  app.get('/api/answers/:userId/:questionId', fetchAnswer);
  app.get('/api/answers/:userId/quiz/:quizId', fetchAllAnswersForQuiz);
}
