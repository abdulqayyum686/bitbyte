import Books from "../../../models/Books";
import User from "../../../models/User"; // Assuming you have a Book model
import dbConnect from "../../../config/dbConnect";

const userController = async (req, res) => {
  await dbConnect();

  if (req.method === "DELETE") {
    const session = await User.startSession();
    session.startTransaction();
    try {
      const { userId } = req.query;

      // Delete the user
      const userDeletionResult = await User.deleteOne({ _id: userId }).session(
        session
      );

      if (userDeletionResult.deletedCount === 0) {
        throw new Error("User not found");
      }

      // Delete books associated with the user
      const booksDeletionResult = await Books.deleteMany({
        user: userId,
      }).session(session);

      // If all operations were successful, commit the transaction
      await session.commitTransaction();
      res
        .status(200)
        .json({ message: "User and associated books deleted successfully" });
    } catch (error) {
      // If any operation within the transaction fails, abort the transaction
      await session.abortTransaction();
      res.status(500).json({
        message: "Error deleting user and books",
        error: error.message,
      });
    } finally {
      // End the session whether transaction is committed or aborted
      session.endSession();
    }
  } else {
    res.status(404).json({ message: "Invalid Request Method" });
  }
};

export default userController;
