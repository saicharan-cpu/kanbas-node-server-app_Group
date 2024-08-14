import mongoose from "mongoose";
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    let module = req.body;
    module._id = new mongoose.Types.ObjectId().toString();
    module.course = req.params.cid;
    const newModule = await dao.createModule(module);
    res.json(newModule);
  };

  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  };

  const findAllModulesByCourse = async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findAllModulesByCourse(cid);
    res.json(modules);
  };

  const findModuleById = async (req, res) => {
    const module = await dao.findModuleById(req.params.mid);
    res.json(module);
  };

  const updateModule = async (req, res) => {
    const { mid } = req.params;
    const status = await dao.updateModule(mid, req.body);
    res.json(status);
  };

  app.post("/api/courses/:cid/modules", createModule);
  app.get("/api/courses/:cid/modules", findAllModulesByCourse);
  app.get("/api/modules/:mid", findModuleById);
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}
