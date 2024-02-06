import dbConnect from "@/config/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  console.log(req.body);
  await dbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(406).json({
        message: "Some Fields are missing",
      });
    }

    try {
      const isUserExists = await User.findOne({ email }).exec();

      if (!isUserExists) {
        return res.status(406).json({
          message: "User Not Exists",
        });
      }

      bcrypt.compare(password, isUserExists.password, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "password decryption error",
          });
        } else {
          if (result == true) {
            const loginToken = jwt.sign(isUserExists.toObject(), "secretkey");
            return res.status(200).json({
              message: "User Login Successful",
              token: loginToken,
            });
          } else {
            return res.status(403).json({
              message: "Invalid password",
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went Wrong, Internal Server Error!",
      });
    }
  } else {
    return res.status(404).json({ message: "Invalid Request Method" });
  }
};

export default registerController;
