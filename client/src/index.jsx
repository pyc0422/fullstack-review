import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


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
      .then(() => {
        this.findTop25((repos) => {
          this.setState({
            repos: repos
          });
        })
      })
      .catch(err => {console.log('search err: ', err); });
  }

  findTop25 (cb) {
    fetch('http://localhost:1128/repos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('this is an HTTP erro');
        }
        return res.json();
      })
      .then((repos) => {
        cb(repos);
      })
      .catch(err => {console.log('find err: ', err);});
  }

  componentDidMount() {
    console.log('updated!');
    this.findTop25((repos) => {
      this.setState({
        repos: repos
      });
    })
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