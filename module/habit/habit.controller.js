import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { habitModel } from "./habit.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";

const habitController = {};

// Add habit
habitController.add = async (req, res, next) => {
  //
  const { title , description , start_date , end_date , status, categoryId } = req.body;

  try {
    const habit = await habitModel.create({
      title , 
      description , 
      start_date , 
      end_date , 
      status,
      userId: req.user.userId,
      categoryId
    });

    await habit.save();

    res.json(habit);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get All habit
habitController.findAll = async (req, res) => {
  try {
    const user = req.user.userId;
    let habits = await habitModel.find({ userId: user }).populate("userId");
    return res.json(habits);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get habit By ID
habitController.findOne = async (req, res) => {
  try {
    let habit = await habitModel.findById(req.params.habitId);
    if (!habit) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Habit not found" });
    }
    return res.json(habit);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Update User By ID
habitController.update = async (req, res) => {
  try {
    let habit = await habitModel.findById(req.params.habitId);
    if (!habit) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Habit not found" });
    }
    Object.assign(habit, req.body);
    await habit.save();
    return res.json(habit);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

// Delete habit By ID
habitController.delete = async (req, res) => {
  try {
    let habit = await habitModel.findByIdAndRemove(req.params.habitId);
    if (!habit) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "habit not found" });
    }
    return res.json({ message: "Habit Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

export default habitController;
