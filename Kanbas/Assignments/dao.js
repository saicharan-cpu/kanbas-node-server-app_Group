import AssignmentModel from './model.js';

export const findAllAssignments = () => AssignmentModel.find().lean();
export const findAssignmentsByCourse = (courseId) => AssignmentModel.find({ course: courseId }).lean();
export const findAssignmentById = (assignmentId) => AssignmentModel.findById(assignmentId).lean();
export const createAssignment = (assignment) => AssignmentModel.create(assignment);
export const updateAssignment = (assignmentId, assignment) => AssignmentModel.updateOne({ _id: assignmentId }, { $set: assignment });
export const deleteAssignment = (assignmentId) => AssignmentModel.deleteOne({ _id: assignmentId });
