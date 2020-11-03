import mongoose from "mongoose";

const schema = mongoose.Schema;

const categorySchema = new schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const categoryModel = mongoose.model("category", categorySchema);
export { categoryModel };
