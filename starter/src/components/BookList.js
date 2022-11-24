import PropTypes from "prop-types";
import Bookshelf from './BookShelf';
import { Link } from "react-router-dom";

const BookList = ({ books, updateBook }) => {

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf updateBook={updateBook} books={books.filter((book) => book.shelf === 'currentlyReading')} shelf="Currently Reading" />
          <Bookshelf updateBook={updateBook} books={books.filter((book) => book.shelf === 'wantToRead')} shelf="Want To Read" />
          <Bookshelf updateBook={updateBook} books={books.filter((book) => book.shelf === 'read')} shelf="Read" />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
};

export default BookList;