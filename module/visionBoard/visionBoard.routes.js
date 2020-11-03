import express from "express";
import visionBoardController from "./visionBoard.controller";
import { asyncWrapper } from "../../utils/asyncWrapper"; 
import authenticateToken from "../../middleware/auth";
import isAdmin from "../../middleware/isAdmin";
import onlyOwner from "../../middleware/onlyOwner";
import onlyMe from "../../middleware/onlyMe";

const visionBoardRoutes = express.Router();

// add a visionBoard
visionBoardRoutes.post(
  "/",
  [authenticateToken],
  asyncWrapper(visionBoardController.add)
);

// view all 
visionBoardRoutes.get(
  "/", [authenticateToken], 
  asyncWrapper(visionBoardController.findAll))


// view one visionBoard
visionBoardRoutes.get(
  "/:visionBoardId",
  [authenticateToken,],
  asyncWrapper(visionBoardController.findOne)
);

// update a visionBoard
visionBoardRoutes.put(
  "/:visionBoardId",
  [authenticateToken,],
  asyncWrapper(visionBoardController.update)
);

// delete a visionBoard
visionBoardRoutes.delete(
  "/:visionBoardId",
  [authenticateToken,],
  asyncWrapper(visionBoardController.delete)
);

export { visionBoardRoutes };
