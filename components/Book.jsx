import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
const Book = ({ book, onChangeBookStatus, deleteBook }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex justify-between">
          <select
            onChange={(e) => onChangeBookStatus(e.target.value, book._id)}
          >
            <option value="ptr">Plan to Read</option>
            <option value="r">Reading</option>
            <option value="c">Completed</option>
          </select>

          <RiDeleteBinLine
            className="text-red-500"
            onClick={() => deleteBook(book._id)}
          />
        </div>
        <hr />
        <br />

        <div className="font-bold">
          Title : <span className="text-sm font-thin">{book.title}</span>
        </div>
        <div className="font-bold">
          Author Name :{" "}
          <span className="text-sm font-thin">{book.authorName}</span>
        </div>
        <div className="font-bold">
          Publication House :{" "}
          <span className="text-sm font-thin">{book.publicationHouse}</span>
        </div>
        <div className="font-bold">
          Publication Date :
          <span className="text-sm font-thin">{book.publicationDate}</span>
        </div>
      </div>
    </>
  );
};

export default Book;
