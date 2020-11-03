import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { visionBoardModel } from "./visionBoard.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";

const visionBoardController = {};

// Add visionBoard
visionBoardController.add = async (req, res, next) => {
  //
  const { title, description, image, date } = req.body;

  try {
    const visionBoard = await visionBoardModel.create({
      title, 
      description, 
      image,
      date, 
      userId: req.user.userId
    });

    await visionBoard.save();

    res.json(visionBoard);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get All visionBoard
visionBoardController.findAll = async (req, res) => {
  try {
    const user = req.user.userId;
    let visionBoards = await visionBoardModel.find({ userId: user }).populate("userId");
    return res.json(visionBoards);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get visionBoard By ID
visionBoardController.findOne = async (req, res) => {
  try {
    let visionBoard = await visionBoardModel.findById(req.params.visionBoardId);
    if (!visionBoard) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Vision Board item not found" });
    }
    return res.json(visionBoard);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Update User By ID
visionBoardController.update = async (req, res) => {
  try {
    let visionBoard = await visionBoardModel.findById(req.params.visionBoardId);
    if (!visionBoard) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Vision Board item not found" });
    }
    Object.assign(visionBoard, req.body);
    await visionBoard.save();
    return res.json(visionBoard);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

// Delete visionBoard By ID
visionBoardController.delete = async (req, res) => {
  try {
    let visionBoard = await visionBoardModel.findByIdAndRemove(req.params.visionBoardId);
    if (!visionBoard) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Vision Board item not found" });
    }
    return res.json({ message: "Vision Board Item Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

export default visionBoardController;
