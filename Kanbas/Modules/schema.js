import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  module: { type: String, required: false }
}, { _id: false });

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: false },
  course: { type: String, required: false },
  lessons: [lessonSchema]
}, { collection: "modules" });

export default moduleSchema;
