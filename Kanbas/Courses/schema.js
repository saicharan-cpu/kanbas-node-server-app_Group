import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  name: { type: String, required: true },
  number: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: true },
  department: { type: String, required: false },
  credits: { type: Number, required: false },
  description: { type: String, required: true },
  // enrolled: [String]
}, { collection: "courses" });

export default courseSchema;
