import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    publicationHouse: {
      type: String,
      required: true,
    },
    Genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
  
    type: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.Books) {
  delete mongoose.connection.models["Books"];
}

const booksModel = mongoose.model("Books", userSchema);

export default booksModel;
