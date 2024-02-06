import User from "../../../models/User";
import bcrypt from "bcrypt";
import dbConnect from "../../../config/dbConnect";
const registerController = async (req, res) => {
  console.log(req.body);
  await dbConnect();

  if (req.method === "POST") {
    const { userName, email, password } = req.body;
    if (!email || !password || !userName) {
      return res.status(406).json({
        message: "Some Fields are missing",
      });
    }

    try {
      const isEmailExists = await User.findOne({ email }).exec();

      if (isEmailExists) {
        return res.status(406).json({
          message: "Email Already Exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        userName,
      });
      let result = await newUser.save();
      res.status(201).json({
        message: "New User has been created successfully!",
        result,
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
