import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
