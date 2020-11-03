import express from "express";
import goalController from "./goal.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import authenticateToken from "../../middleware/auth";
import isAdmin from "../../middleware/isAdmin";
import onlyOwner from "../../middleware/onlyOwner";

const goalRoutes = express.Router();

// add a goal
goalRoutes.post(
  "/",
  [authenticateToken,],
  asyncWrapper(goalController.add)
);

// view all 
goalRoutes.get(
  "/", [authenticateToken,], 
  asyncWrapper(goalController.findAll));


// view one goal
goalRoutes.get(
  "/:goalId",
  [authenticateToken,],
  asyncWrapper(goalController.findOne)
);

// update a goal
goalRoutes.put(
  "/:goalId",
  [authenticateToken,],
  asyncWrapper(goalController.update)
);

// delete a goal
goalRoutes.delete(
  "/:goalId",
  [authenticateToken,],
  asyncWrapper(goalController.delete)
);

export { goalRoutes };
