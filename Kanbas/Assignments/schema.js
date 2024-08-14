// Kanbas/Assignments/schema.js
import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  points: { type: Number, required: false },
  assignmentGroup: { type: String, required: false },
  displayGradeAs: { type: String, required: false },
  submissionType: { type: String, required: false },
  onlineEntryOptions: {
    textEntry: { type: Boolean, required: false },
    websiteURL: { type: Boolean, required: false },
    mediaRecordings: { type: Boolean, required: false },
    studentAnnotation: { type: Boolean, required: false },
    fileUpload: { type: Boolean, required: false }
  },
  assignTo: { type: String, required: false },
  dueDate: { type: Date, required: false },
  availableFrom: { type: Date, required: false },
  notAvailableUntil: { type: Date, required: false },
  availableUntil: { type: Date, required: false },
  course: { type: String, required: false },
}, { collection: 'assignments' });

export default assignmentSchema;
