import schema from "./schema.js";
import mongoose from "mongoose";
const model = mongoose.model("QuestionModel", schema);
export default model;
 