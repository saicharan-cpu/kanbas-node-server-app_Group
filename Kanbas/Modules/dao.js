import model from "./model.js";

export const createModule = (module) => {
  return model.create(module);
};

export const deleteModule = (id) => {
  return model.deleteOne({ _id: id });
};

export const findAllModulesByCourse = (courseId) => {
  return model.find({ course: courseId }).lean();
};

export const findModuleById = (id) => {
  return model.findById(id).lean();
};

export const updateModule = (id, module) => {
  return model.updateOne({ _id: id }, { $set: module });
};
