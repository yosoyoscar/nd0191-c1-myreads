import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "./Book";

const Search = ({ books, updateBook }) => {

  const [booksSearched, setBooksSearched] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let searchCancelled = false;
    const searchBooks = async () => {
      if (searchText.length > 0) {
        const res = await BooksAPI.search(searchText, 20);
        // set searchResults, if no book is get, set to empty array
        let searchResults = (!res || res.error ? [] : res);
        // look up existing books in my shelves and update categories accordingly
        searchResults.forEach(e => {
          const newShelf = books.map((b) => e.id === b.id ? b.shelf : 'none').filter(cat => cat !== 'none');
          e.shelf = newShelf.length ? newShelf[0] : 'none';
        });
        if (!searchCancelled) {
          setBooksSearched(searchResults);
        }
      }
      else {
        setBooksSearched([]);
      }
    }

    searchBooks();

    //clean useEffect
    return () => (
      searchCancelled = true
    );
  }, [searchText]);

  useEffect(() => {
    //console.log('Search.booksSearched:', booksSearched)
  }, [booksSearched]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value) }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {booksSearched.map((book) =>
            <li key={book.id}>
              <Book book={book} updateBook={updateBook} />
            </li>
          )}
        </ol>
      </div>
      <div className="no-books-found">
        {(booksSearched.length === 0 && searchText.length) ? <p>No books found for {searchText}</p> : <p></p>}
      </div>
    </div>
  )

}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
};

export default Search;