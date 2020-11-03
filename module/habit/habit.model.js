import mongoose from "mongoose";

const schema = mongoose.Schema;

const habitSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  }
});

const habitModel = mongoose.model("habit", habitSchema);
export { habitModel };
