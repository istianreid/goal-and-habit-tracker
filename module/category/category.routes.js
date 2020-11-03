import express from "express";
import categoryController from "./category.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
import authenticateToken from "../../middleware/auth";
import isAdmin from "../../middleware/isAdmin";
import onlyOwner from "../../middleware/onlyOwner";

const categoryRoutes = express.Router();

categoryRoutes.get("/", function(req, res, next) {
  res.json({ message: "from category" });
});


// add a category
categoryRoutes.post(
  "/add",
  [authenticateToken, isAdmin],
  asyncWrapper(categoryController.add)
);

// view all 
categoryRoutes.get(
  "/categories", [authenticateToken], 
  asyncWrapper(categoryController.findAll));

// update a category
categoryRoutes.put(
  "/:categoryId",
  [authenticateToken, isAdmin],
  asyncWrapper(categoryController.update)
);  

// delete a category
categoryRoutes.delete(
  "/:categoryId",
  [authenticateToken, isAdmin],
  asyncWrapper(categoryController.delete)
);

export { categoryRoutes };
