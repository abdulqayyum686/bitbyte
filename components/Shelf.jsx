import React, { useState } from "react";
import Book from "@/components/Book";
import { useUpdateSuperheroData, useDeleteSuperheroData } from "@/utils/hooks";

const Shelf = ({ title, books }) => {
  const { mutate: changeBookStatus } = useUpdateSuperheroData();
  const { mutate: deleteBookData } = useDeleteSuperheroData();

  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending

  const sortBooks = (books) => {
    return books.sort((a, b) => {
      const titleA = a.title.toUpperCase(); // ignore upper and lowercase
      const titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (sortOrder === "asc") {
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      } else {
        return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedBooks = sortBooks([...books]);
  const onChangeBookStatus = (data, id) => {
    changeBookStatus({
      type: data,
      _id: id,
    });
  };

  const deleteBook = (id) => {
    deleteBookData({
      _id: id,
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold underline">{title}</h2>

          {sortedBooks.length > 0 && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
              onClick={toggleSortOrder}
            >
              Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                onChangeBookStatus={onChangeBookStatus}
                deleteBook={deleteBook}
              />
            ))
          ) : (
            <div className="font-semibold italic text-red-500">
              No book available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shelf;
