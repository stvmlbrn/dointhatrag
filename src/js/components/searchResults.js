import React from 'react';

import Result from './result';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {searching, results, initLoad} = this.props;

    if (searching) {
      return (
        <div>
          <br/>
          <i className="fa fa-spinner fa-spin"></i> Searching...
        </div>
      )
    } else {
      return (
        <div>
          <br/>
          <table className="table">
            <thead>
              <tr>
                <th>Song</th>
                <th>Band</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Audio</th>
                <th>Video</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => {
                return (
                 <Result key={r.id} record={r}/>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
