import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import {Link} from 'react-router-dom'
import Book from './Book.js'

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      books: [],
    };
  }

  updateSearch = (search)=>{
    BooksAPI.search(search,10).then((books)=>{
      if (!books.error) {
        this.setState({search: search, books: books});
      }else{
        this.setState({search: search, books:[]})
      }

    })

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
              <p>{this.state.search === ''? 'Type in the seach to find something amazing!': 'Sorry, no matches for \''+this.state.search+'\'...'}</p>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
