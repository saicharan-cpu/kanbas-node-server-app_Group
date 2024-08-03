import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: String, required: true },
  points: { type: Number, required: true },
  quizType: {
    type: String,
    enum: ['Practice Quiz', 'Graded Quiz', 'Graded Survey', 'Ungraded Survey'],
    default: 'Graded Quiz',
    required: true
  },
  timeLimit: { type: Number, required: true },
  assignmentGroup: {
    type: String,
    enum: ["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes",
    required: true
  },
  isShuffled: { type: Boolean, required: true },
  ismultipleAttempts: { type: Boolean, required: true },
  isPublished: { type: Boolean, required: true },
  viewResponse: {
    type: String,
    enum: ["Always"],
    default: "Always",
    required: true
  },
  showCorrectAnswers: {
    type: String,
    enum: ["Immediately", "After all attempts are graded", "After due date"],
    default: "Immediately",
    required: true
  },
  accessCode: { type: String, required: false },
  onQuestionAtaTime: { type: Boolean, required: true },
  webcamRequired: { type: Boolean, required: true },
  lockQuestionsAfterAnswering: { type: Boolean, required: true },
  dueDate: { type: Date, required: true },
  availabilityDate: { type: Date, required: true },
  untilDate: { type: Date, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
}, { collection: "quizzes" });

export default quizSchema;
