import "./App.css";
import { useEffect, useState } from "react";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import Search from "./Search";

function App() {
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchpage] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const toggleSearchPage = () => {
    setShowSearchpage(!showSearchPage);
  }

  const updateBook = (book, shelf) => {
    const updateBook = book;
    book.shelf = shelf;
    if(shelf === 'none'){
      setBooks(books.filter((e) => e.id !== book.id));
      BooksAPI.update(book, 'none')
    }
    else{
      setBooks(books.filter((e) => e.id !== book.id).concat(updateBook));
      BooksAPI.update(book, shelf);
    }
  };

  return (
    <div className="app">
      {showSearchPage ? ( <Search books={books} toggleSearchPage={toggleSearchPage} updateBook={updateBook}/>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf updateBook={updateBook} books={books.filter( (book) => book.shelf === 'currentlyReading')} shelf="Currently Reading"/>
              <Bookshelf updateBook={updateBook} books={books.filter( (book) => book.shelf === 'wantToRead')} shelf="Want To Read"/>
              <Bookshelf updateBook={updateBook} books={books.filter( (book) => book.shelf === 'read')} shelf="Read"/>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
