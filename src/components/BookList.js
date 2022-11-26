import PropTypes from "prop-types";
import Bookshelf from './BookShelf';
import { Link } from "react-router-dom";

const BookList = ({ books, updateBook }) => {

  const shelves = [
    { name: 'Currently Reading', category: 'currentlyReading' },
    { name: 'Want To Read', category: 'wantToRead' },
    { name: 'Read', category: 'read' },
  ]

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) =>
            <Bookshelf
              key={shelf.category}
              updateBook={updateBook}
              books={books.filter((book) => book.shelf === shelf.category)}
              shelf={shelf.name} />
          )}
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