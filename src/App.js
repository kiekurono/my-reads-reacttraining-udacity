import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './api/BooksAPI'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    library: []
  }

  /**
  *Initalize the bookshelves
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      this.setState({
        library: books
      });
    });
  }

  /**
  *This moves the book from one shelf to another
  *then it updates the bookshelves.
  */
  moveBook = (book,shelf) => {
      BooksAPI.update(book,shelf);

      if (book.shelf === 'none') {
        if (shelf === 'none') {
          return;
        }
        book.shelf = shelf;
        const library = this.removeOldBooks(this.state.library.concat(book));
        this.setState({library});
        return;
      }

      this.setState((prevState)=>{
        library: this.removeOldBooks(prevState.library.map((libBook) => {
          if (libBook.id === book.id) {
            libBook.shelf = shelf;
          }
          return libBook;
        }));
      });
    };

  removeOldBooks = (books) => {
    return books.filter((book) => (book.shelf !== 'none'));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <ListBooks
            books={this.state.library}
            moveBook={this.moveBook}
          />
        )}
        />
        <Route path="/search"
          render={()=>(
            <SearchBooks
              library={this.state.library}
              moveBook={this.moveBook}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
