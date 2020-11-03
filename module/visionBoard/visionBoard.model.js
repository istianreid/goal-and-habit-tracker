import mongoose from "mongoose";

const schema = mongoose.Schema;

const visionBoardSchema = new schema({
  title: {
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
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
});

const visionBoardModel = mongoose.model("visionBoard", visionBoardSchema);
export { visionBoardModel };
