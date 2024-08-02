import * as dao from "./dao.js";
import mongoose from "mongoose";

export default function AssignmentRoutes(app) {
  const createAssignment = async (req, res) => {
    let assignment = req.body;
    if (!assignment._id) {
      assignment._id = new mongoose.Types.ObjectId().toString();
    }
    const newAssignment = await dao.createAssignment(assignment);
    res.json(newAssignment);
  };

  const deleteAssignment = async (req, res) => {
    const status = await dao.deleteAssignment(req.params.id);
    res.json(status);
  };

  const findAllAssignments = async (req, res) => {
    console.log("Fetching all assignments");
    const assignments = await dao.findAllAssignments();
    console.log("Fetched assignments:" + JSON.stringify(assignments));
    res.json(assignments);
  };

  const findAssignmentsByCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsByCourse(cid);
    if (!assignments || assignments.length === 0) {
      return res.status(404).send("No assignments found for this course");
    }
    res.json(assignments);
  };

  const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateAssignment(id, req.body);
    res.json(status);
  };

  app.post("/api/assignments", createAssignment);
  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:cid", findAssignmentsByCourse);
  app.put("/api/assignments/:id", updateAssignment);
  app.delete("/api/assignments/:id", deleteAssignment);
}