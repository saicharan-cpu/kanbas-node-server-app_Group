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
    console.log("Fetched courses:" + JSON.stringify(courses));
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

  const enrollInCourse = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    console.log("In server enroll in course: "+userId+" course id is: "+id);
    try {
      const course = await dao.findCourseById(id);
      if (!course.enrolled.includes(userId)) {
        course.enrolled.push(userId);
        const updatedCourse = await dao.updateCourse(id, course);
        res.json(updatedCourse);
      } else {
        res.status(400).json({ message: 'User already enrolled' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to enroll in course', error });
    }
  };

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:id", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
  app.post("/api/courses/:id/enroll", enrollInCourse);
}
