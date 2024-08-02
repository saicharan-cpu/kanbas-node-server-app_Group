import Database from "../Database/index.js";

export default function QuizRoutes(app) {

  app.get("/api/quizzes", (req, res) => {
    const quizzes = Database.Quizzes;
    res.send(quizzes);
  });


  app.get("/api/quizzes/:cid", (req, res) => {
    const { cid } = req.params;
    const quiz = Database.Quizzes.filter((q) => q.course === cid);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }
    res.send(quiz);
  });


  app.post("/api/quizzes", (req, res) => {
    const quiz = { ...req.body, _id: new Date().getTime().toString() };
    Database.Quizzes.push(quiz);
    res.send(quiz);
  });

  app.put("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
    const updatedQuiz = req.body;
    Database.Quizzes = Database.Quizzes.map((a) =>
      a._id === id ? { ...a, ...updatedQuiz } : a
    );
    res.sendStatus(204);
  });


  app.delete("/api/quizzes/:id", (req, res) => {
    const { id } = req.params;
    Database.Quizzes = Database.Quizzes.filter((a) => a._id !== id);
    res.sendStatus(200);
  });
}
