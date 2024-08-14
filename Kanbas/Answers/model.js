import schema from "./schema.js";
import mongoose from "mongoose";

const model = mongoose.model("AnswerModel", schema);
export default model;