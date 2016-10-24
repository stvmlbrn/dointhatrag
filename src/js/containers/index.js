import React from 'react';

import Search from '../components/search';
import SearchResults from '../components/searchResults';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      criteria: '',
      results: [],
      searching: false,
      initLoad: true
    };
  }

  search = (e) => {
    e.preventDefault();
    var {results} = this.state;

    this.setState({searching: true});

    fetch('/search', {
      method: 'post',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({criteria: this.state.criteria})
    })
    .then(results => results.json())
    .then(results => this.setState({results: results, searching: false, initLoad: false}));
  }

  onChange = (e) => {
    var s = this.state;

    s[e.target.name] = e.target.value;
    this.setState(s);
  }

  render() {
    var {criteria, searching, results, initLoad} = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <Search criteria={criteria} onSubmit={this.search} onChange={this.onChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {!initLoad ? <SearchResults searching={searching} results={results} initLoad={initLoad}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}
