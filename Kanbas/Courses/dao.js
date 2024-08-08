import CourseModel from "./model.js";

export const createCourse = (course) => {
  return CourseModel.create(course);
};

export const findAllCourses = () => CourseModel.find().lean();

export const findCourseById = (courseId) => CourseModel.findById(courseId);

export const updateCourse = (courseId, course) => CourseModel.updateOne({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) => CourseModel.deleteOne({ _id: courseId });

export const enrollUserInCourse = async (id, userId) => {
  console.log(`Received request to enroll into course ${id} from user ${userId} in dao`);
  try {
    const result = await CourseModel.updateOne(
      { _id: id },
      { $addToSet: { enrolled: userId } } // Using $addToSet to avoid duplicate entries
    );
   
    return result;
  } catch (error) {
    console.error('Error enrolling user in course:', error);
    throw error;
  }
};