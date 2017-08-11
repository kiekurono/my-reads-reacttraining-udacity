import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf.js'
import './App.css'

class ListBooks extends React.Component {

  render() {
    const {books,moveBook} = this.props;

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            books={books.filter((book) => book.shelf === 'currentlyReading')}
            moveBook={moveBook}
          />
          <BookShelf
            title="Want To Read"
            books={books.filter((book) => book.shelf === 'wantToRead')}
            moveBook={moveBook}
          />
          <BookShelf
            title="Read"
            books={books.filter((book) => book.shelf === 'read')}
            moveBook={moveBook}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default ListBooks;
