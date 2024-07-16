import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {

  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments);
  });


  app.get("/api/assignments/:cid", (req, res) => {
    const { cid } = req.params;
    const assignment = Database.assignments.filter((a) => a.course === cid);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }
    res.send(assignment);
  });


  app.post("/api/assignments", (req, res) => {
    const assignment = { ...req.body, _id: new Date().getTime().toString() };
    Database.assignments.push(assignment);
    res.send(assignment);
  });

  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const updatedAssignment = req.body;
    Database.assignments = Database.assignments.map((a) =>
      a._id === id ? { ...a, ...updatedAssignment } : a
    );
    res.sendStatus(204);
  });


  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(200);
  });
}
