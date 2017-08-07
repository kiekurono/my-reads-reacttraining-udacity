import React from 'react'
import {Route, Link} from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks.js'
import Book from './Book.js'
import * as BooksAPI from './api/BooksAPI'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.moveBook = this.moveBook.bind(this);
    this.state = {
      wantToRead: [],
      currentlyReading: [],
      read: []
    }
  }

  /**
  *Initalize the bookshelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      this.setState({
        wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        read: books.filter((book) => book.shelf === 'read')
      });
    })

  }

  /**
  *This moves the book from one shelf to another
  *then it updates the bookshelves.
  */
  moveBook(book,shelf) {
    BooksAPI.update(book,shelf);
    BooksAPI.getAll().then((books) =>{
      this.setState({
        wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        read: books.filter((book) => book.shelf === 'read')
      });
    })
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading.map((book) =>(
                        <li key={book.id}>
                          <Book
                            book={book}
                            moveBook={this.moveBook}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead.map((book) =>(
                        <li key={book.id}>
                          <Book
                            book={book}
                            moveBook={this.moveBook}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read.map((book) =>(
                        <li key={book.id}>
                          <Book
                            book={book}
                            moveBook={this.moveBook}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}
        />
        <Route path="/search"
          render={()=>(
            <SearchBooks
              moveBook={this.moveBook}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
