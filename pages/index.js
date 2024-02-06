import { useEffect, useState } from "react";

import {
  useUpdateSuperheroData,
  useDeleteSuperheroData,
  useUser,
  useGetALLBooks,
} from "@/utils/hooks";
import SearchBar from "@/components/SearchBar";
import Shelf from "@/components/Shelf";
import Header from "@/components/Header";

export default function Home() {
  const { isLoading, data: currentUser } = useUser();
  console.log(currentUser);

  // console.log("currentuser===", currentUser);

  const { isLoading: isBooksLoading, data: allBooks } = useGetALLBooks();

  // start

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Function to filter books for each shelf based on their status
  const filterBooks = (status) => {
    const result = books?.filter((book) => book?.type === status);
    // console.log("result", query, status);
    return result.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    setBooks(allBooks?.result ? allBooks?.result : []);
  }, [allBooks]);

  if (isBooksLoading) {
    return (
      <>
        <div class="flex justify-center items-center h-screen">
          <h2 class="text-4xl font-bold text-center">Loading...</h2>
        </div>
      </>
    );
  }
  // console.log("books", books);
  return (
    <>
      <Header />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      All Books
                    </h2>
                  </div>

                  <div>
                    <SearchBar query={query} handleSearch={handleSearch} />
                    <Shelf title="Plan to Read" books={filterBooks("ptr")} />
                    <Shelf title="Reading" books={filterBooks("r")} />
                    <Shelf title="Completed" books={filterBooks("c")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
