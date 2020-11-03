import express from "express";
import habitController from "./habit.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import authenticateToken from "../../middleware/auth";
import isAdmin from "../../middleware/isAdmin";
import onlyOwner from "../../middleware/onlyOwner";
import onlyMe from "../../middleware/onlyMe";

const habitRoutes = express.Router();

// add a habit
habitRoutes.post(
  "/",
  [authenticateToken],
  asyncWrapper(habitController.add)
);

// view all 
habitRoutes.get(
  "/", [authenticateToken], 
  asyncWrapper(habitController.findAll))


// view one habit
habitRoutes.get(
  "/:habitId",
  [authenticateToken,],
  asyncWrapper(habitController.findOne)
);

// update a habit
habitRoutes.put(
  "/:habitId",
  [authenticateToken,],
  asyncWrapper(habitController.update)
);

// delete a habit
habitRoutes.delete(
  "/:habitId",
  [authenticateToken,],
  asyncWrapper(habitController.delete)
);

export { habitRoutes };
