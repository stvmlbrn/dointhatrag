import React from 'react';
import Moment from 'moment';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  audioLink = (link) => {
    if (link) {
      return (
        <a href={link} target="_blank"><i className="fa fa-soundcloud fa-2x"></i></a>
      );
    } else {
      return ('');
    }
  }

  videoLink = (link) => {
    if (link) {
      return (
        <a href={link} target="_blank"><i className="fa fa-youtube-play fa-2x"></i></a>
      );
    } else {
      return ('');
    }
  }

  render() {
    var {record} = this.props;
    return (
      <tr>
        <td>{record.title}</td>
        <td>{record.bandName}</td>
        <td>{Moment(record.date).format('YYYY-MM-DD')}</td>
        <td>{record.venueName}<br/>{record.location}</td>
        <td>
          {this.audioLink(record.audio)}
        </td>
        <td>
          {this.videoLink(record.video)}
        </td>
      </tr>
    );
  }
};
