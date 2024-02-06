import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.User) {
  delete mongoose.connection.models["User"];
}

const userModel = mongoose.model("User", userSchema);

export default userModel;
