import * as dao from "./dao.js";
import mongoose from "mongoose";

export default function CourseRoutes(app) {
  const createCourse = async (req, res) => {
    let course = req.body;
      course._id = new mongoose.Types.ObjectId().toString();
    const newCourse = await dao.createCourse(course);
    res.json(newCourse);
  };

  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.id);
    res.json(status);
  };

  const findAllCourses = async (req, res) => {
    console.log("Fetching all courses");
    const courses = await dao.findAllCourses();
    console.log("Fetched courses:"+courses);
    res.json(courses);
  };

  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.id);
    res.json(course);
  };

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    res.json(status);
  };

  const enrollUser = async (req, res) => {
    try {
      const { id, userId } = req.params;
      console.log(`Current user id: ${userId}`);
     
      const result = await dao.enrollUserInCourse(id, userId);
 
      // Check if any documents were matched and the operation was acknowledged
      if (result.matchedCount > 0 && result.acknowledged) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Course not found or user already enrolled' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
  app.put('/api/courses/:id/enroll/:userId', enrollUser);
}