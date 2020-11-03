import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { categoryModel } from "./category.model";
import httpStatus from "../../utils/httpStatus";
import appConfig from "../../config/env";

const categoryController = {};

// Add category
categoryController.add = async (req, res, next) => {
  
  const { name, description, image } = req.body;

  try {
    const category = await categoryModel.create({
      name , 
      description,
      image
    });

    await category.save();

    res.json(category);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// Get All categories
categoryController.findAll = async (req, res) => {
  try {
    let categories = await categoryModel.find();
    return res.json(categories);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};



// Update Category By ID
categoryController.update = async (req, res) => {
  try {
    let category = await categoryModel.findById(req.params.categoryId);
    if (!category) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Category not found" });
    }
    Object.assign(category, req.body);
    await category.save();
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};



// Delete Category By ID
categoryController.delete = async (req, res) => {
  try {
    let category = await categoryModel.findByIdAndRemove(req.params.categoryId);
    if (!category) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "category not found" });
    }
    return res.json({ message: "category deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};



export default categoryController;