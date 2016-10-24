import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {criteria, onSubmit, onChange} = this.props;

    return (
      <div className="text-center">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name="criteria" className="form-control input-lg"
              value={criteria} onChange={onChange} autoFocus placeholder="Song title or venue..."/>
          </div>
          <button className="btn btn-default">
            <img src='/stealie-small.png' height="40"/> Search
          </button>
        </form>
      </div>
    );
  }
}
