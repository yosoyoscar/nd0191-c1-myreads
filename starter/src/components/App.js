import "../css/App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookList from "./BookList";
import Search from "./Search";

function App() {
  //all books in my shelves
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //get books from server
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const updateBook = (book, shelf) => {
    const updateBook = book;
    book.shelf = shelf;
    //delete book
    if (shelf === 'none') {
      setBooks(books.filter((e) => e.id !== book.id));
      BooksAPI.update(book, 'none')
    }
    //insert book or update category of an existing one
    else {
      setBooks(books.filter((e) => e.id !== book.id).concat(updateBook));
      BooksAPI.update(book, shelf);
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <BookList books={books} updateBook={updateBook} />
        }
        />
        <Route path="/search" element={
          <Search books={books} updateBook={updateBook} />
        }
        />
      </Routes>
    </div>
  );
}

export default App;
