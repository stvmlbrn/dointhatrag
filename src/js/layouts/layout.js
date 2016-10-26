import React from 'react';

import '../../css/bootstrap.scss';
import '../../css/font-awesome/scss/font-awesome.scss';
import '../../css/main.scss';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container" id="main">
          <div className="row">
            <div className="col-md-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
