import express from "express";
import { crudRoutes } from "../../module/user/user.routes";
import { habitRoutes } from "../../module/habit/habit.routes";
import { goalRoutes } from "../../module/goal/goal.routes";
import { visionBoardRoutes } from "../../module/visionBoard/visionBoard.routes";
// import { goalCheckRoutes } from "../../module/goalCheck/goalCheck.routes";
import { categoryRoutes } from "../../module/category/category.routes";

const apiRoutes = express.Router();

apiRoutes.get("/", function(req, res, next) {
  res.json({ message: "Welcome to Goal and Habit Tracker" });
});

apiRoutes.use("/auth", crudRoutes);
apiRoutes.use("/habit", habitRoutes);
apiRoutes.use("/goal", goalRoutes);
apiRoutes.use("/visionBoard", visionBoardRoutes);
// apiRoutes.use("/goalCheck", goalCheckRoutes);
apiRoutes.use("/category", categoryRoutes);

export default apiRoutes;
