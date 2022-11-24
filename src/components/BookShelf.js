import PropTypes from "prop-types";
import Book from "./Book";

const Bookshelf = ({ books, shelf, updateBook }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf} [{books.length}]</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map(book =>
                            <li key={book.id}><Book book={book} updateBook={updateBook} /></li>
                        )
                    }
                </ol>
            </div>
        </div>
    )
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired,
};

export default Bookshelf;