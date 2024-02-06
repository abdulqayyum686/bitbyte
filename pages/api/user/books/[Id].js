import Books from "../../../../models/Books";
import dbConnect from "../../../../config/dbConnect";
const booksController = async (req, res) => {
  const { title } = req.body;
  await dbConnect();

  if (req.method === "POST") {
    console.log("addBook", req.body);
    try {
      const isExists = await Books.findOne({ title }).exec();
      console.log(isExists);
      if (isExists) {
        return res.status(406).json({
          message: "Book Name Already Exists",
        });
      }
      const newEntity = new Books(req.body);
      let result = await newEntity.save();
      res.status(201).json({
        message: "New Book has been created successfully!",
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went Wrong, Internal Server Error!",
      });
    }
  } else if (req.method === "PUT") {
    try {
      let result = await Books.findByIdAndUpdate(
        { _id: req.body._id.toString() },
        req.body,
        {
          useFindAndModify: false,
          new: true,
        }
      ).exec();

      console.log(req.body, result);
      if (result) {
        res.status(201).json({
          message: "Book updated Successfully",
          result,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went Wrong, Internal Server Error!",
      });
    }
  } else if (req.method === "DELETE") {
    console.log("Id", req.query.Id);
    try {
      let result = await Books.findOneAndDelete({
        _id: req.query.Id.toString(),
      });

      if (result) {
        res.status(201).json({
          message: "Book Deleted Successfully",
          result,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went Wrong, Internal Server Error!",
      });
    }
  } else if (req.method === "GET") {
    try {
      let result = await Books.find({ userId: req.query.Id });
      console.log("datappp", result);
      if (result) {
        res.status(200).json({
          result,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something went Wrong, Internal Server Error!",
      });
    }
  } else {
    return res.status(404).json({ message: "Invalid Request Method" });
  }
};

export default booksController;
