const Book = ( { book, updateBook }) => {

    const handleShelfChange = (e) => {
        updateBook(book, e.target.value)
    }

    return (
        <div className="book" title={book.description}>
            <div className="book-top">
                <div className="book-cover"
                        style={
                        {width: 128, height: 192, backgroundImage: book && book.imageLinks ? `url("${book.imageLinks.smallThumbnail}")` : ''}
                        }></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={handleShelfChange}>
                    <option value="moveTo" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

export default Book;