import schema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("QuizModel", schema);
export default model;