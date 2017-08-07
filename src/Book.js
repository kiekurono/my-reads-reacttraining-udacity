import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

class Book extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selector: ''
    };
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  }

/**
*Initalize selector for shelf dropdown.
*/
  componentDidMount() {
    this.setState({selector: this.props.book.shelf});
  }

  render() {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+(this.props.book.hasOwnProperty("imageLinks")? (this.props.book.imageLinks.smallThumbnail):'')+')' }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.selector} onChange={(event) => {this.props.moveBook(this.props.book,event.target.value); this.setState({selector:event.target.value})}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.hasOwnProperty("authors")? (this.props.book.authors[0]):""}</div>
      </div>
    )
  }
}


export default Book
