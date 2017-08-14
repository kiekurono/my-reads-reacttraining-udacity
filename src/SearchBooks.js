import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './api/BooksAPI'
import Book from './Book.js'

class SearchBooks extends React.Component {
  state = {
    search: '',
    books: [],
  }

  static propTypes = {
    library: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  /**
  *Updates search and show the correct status fo rthe onese
  *already in our library.
  */
  updateSearch = (search)=>{
    this.setState({search});

    if (!search) {
      this.setState({books:[]});
      return;
    }

    BooksAPI.search(search,10).then((books) => {
      if (!books.error) {
        let onShelf = this.props.library.filter((book)=>(books.findIndex((searchedBook)=>(searchedBook.id === book.id)) >= 0 && book.shelf !=='none'));
        let notOnShelf = books.filter((book)=>(this.props.library.findIndex((libBook)=>(libBook.id === book.id)) < 0));

        const listBooks = onShelf.concat(notOnShelf.map((book)=>{book.shelf='none'; return book;}));

        this.setState({books: listBooks});
      }else{
        this.setState({books:[]});
      }

    });
  }


  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.search}
            onChange={(event)=>this.updateSearch(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 ? (
              this.state.books.map((book) =>(
                  <li key={book.id}>
                    <Book
                      book={book}
                      moveBook={this.props.moveBook}
                    />
                  </li>
                ))
            ):(
              <p>{this.state.search === ''? "Type in the seach to find something amazing!": "Sorry, no matches for '"+this.state.search+"'..."}</p>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
