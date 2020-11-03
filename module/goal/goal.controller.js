import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { goalModel } from "./goal.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";

const goalController = {};

// Add goal
goalController.add = async (req, res, next) => {
  //
  const { title, description, image, start_date, end_date, status, categoryId } = req.body;

  try {
    const goal = await goalModel.create({
      title, 
      description,
      image,
      start_date, 
      end_date, 
      status,
      userId: req.user.userId,
      categoryId
    });

    await goal.save();

    res.json(goal);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get All goal
goalController.findAll = async (req, res) => {
  try {
    const user = req.user.userId;
    let goals = await goalModel.find({ userId: user }).populate("userId");
    return res.json(goals);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get goal By ID
goalController.findOne = async (req, res) => {
  try {
    let goal = await goalModel.findById(req.params.goalId);
    if (!goal) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Goal not found" });
    }
    return res.json(goal);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Update goal By ID
goalController.update = async (req, res) => {
  try {
    let goal = await goalModel.findById(req.params.goalId);
    if (!goal) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Goal not found" });
    }
    Object.assign(goal, req.body);
    await goal.save();
    return res.json(goal);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

// Delete goal By ID
goalController.delete = async (req, res) => {
  try {
    let goal = await goalModel.findByIdAndRemove(req.params.goalId);
    if (!goal) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Goal not found" });
    }
    return res.json({ message: "Goal Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

export default goalController;
