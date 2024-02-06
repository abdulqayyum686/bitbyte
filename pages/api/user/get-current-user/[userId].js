import User from "./../../../../models/User";
import dbConnect from "./../../../../config/dbConnect";
const registerController = async (req, res) => {
  console.log(req.body);
  await dbConnect();

  if (req.method === "GET") {
    try {
      console.log(req.query);
      const result = await User.findOne({ _id: req.query.userId }).exec();
      res.status(201).json({
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
