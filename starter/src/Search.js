import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const Search = ( { books, toggleSearchPage, updateBook }) => {

    const [booksSearched, setBooksSearched] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const searchBooks = async () => {
          if(searchText.length > 0){
            const res = await BooksAPI.search(searchText, 20);
            let searchResults = (!res || res.error ? [] : res);
            searchResults.forEach(e => {
              const newShelf = books.map( (b) => e.id === b.id ? b.shelf : 'none' ).filter( cat => cat !== 'none' );
              e.shelf = newShelf.length ? newShelf[0] : 'none';
            });
            console.log('searchResults:', searchResults);
            setBooksSearched(searchResults);
          }
          
        }
    
        searchBooks();

        return () => {
          }
      }, [searchText]);

      useEffect(() => { console.log('Search.booksSearched:', booksSearched)},[booksSearched]);

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={toggleSearchPage}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={searchText}
                onChange={(e) => {setSearchText(e.target.value)}}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {booksSearched.map((book) =>
                  <li key={book.id}>
                    <Book book={book} updateBook={updateBook}/>
                  </li>
                )}
            </ol>
          </div>
          <div className="no-books-found">
            { (booksSearched.length === 0 && searchText.length) ? <p>No books found for {searchText}</p> : <p></p> }
          </div>
        </div>
    )

}

export default Search;