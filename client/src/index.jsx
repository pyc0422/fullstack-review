import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { useState, useEffect } from "react";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // send post request to server

    fetch('http://localhost:1128/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: term})
    })
      .then((res) => {
        console.log('get data success!');
      })
      .catch(err => {console.log('search err: ', err); });
  }

  componentDidMount() {
    fetch('http://localhost:1128/repos')
    .then((res) => {
      if (!res.ok) {
        throw new Error('this is an HTTP erro');
      }
      return res.json();
    })
    .then((repos) => {
      this.setState({
        repos: repos
      });
      console.log(repos);
    });
  }

  render () {

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));