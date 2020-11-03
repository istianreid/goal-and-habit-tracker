import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "member",
  },
  activation_key: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userSchema);
export { userModel };
