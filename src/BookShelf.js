import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'
import './App.css'

class BookShelf extends React.Component {
  render() {
    const {title,books,moveBook} = this.props;

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) =>(
              <li key={book.id}>
                <Book
                  book={book}
                  moveBook={moveBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  moveBook: PropTypes.func.isRequired
}
export default BookShelf;
