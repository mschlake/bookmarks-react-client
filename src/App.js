import React, { Component } from 'react';
import './App.css';
import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }
  
  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer $2a$10$F.sqQEwoG31yaPSH17rYquYQEl5cL.cr0.h1ztmm2fWkD7pDy/XMa",
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

  }

  render() {
    const page = this.state.showAddForm
          ? <AddBookmark />
          : <BookmarkApp bookmarks={this.state.bookmarks}/>; 

    return (
      <div className="App">
        { page }
      </div>
    );
  }
}

export default App;
