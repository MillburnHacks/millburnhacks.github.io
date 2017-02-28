import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';

const Club = ({ src, clubID }) => (
  <div>
    <h3>{src.name}</h3>
    <p>{src.slogan}</p>
    <Link to={`/club/${clubID}`}>See more</Link>
  </div>
);

Club.propTypes = {
  src: React.PropTypes.shape({
    [React.PropTypes.string]: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      meetings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      slogan: React.PropTypes.string.isRequired,
      officers: React.PropTypes.object.isRequired,
      description: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
  clubID: React.PropTypes.string.isRequired,
};

const Event = ({ src, eventID }) => (
  <div>
    <h3>{src.name}</h3>
    <p>Date: {src.date.mm}-{src.date.dd}</p>
    <Link to={`/event/${eventID}`}>See more</Link>
  </div>
);

Event.propTypes = {
  src: React.PropTypes.shape({
    [React.PropTypes.string]: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      date: React.PropTypes.shape({
        yyyy: React.PropTypes.number,
        mm: React.PropTypes.number,
        dd: React.PropTypes.number,
      }).isRequired,
      description: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
  eventID: React.PropTypes.string.isRequired,
};

export default class Home extends React.Component {
  constructor() {
    super();

    // set up the default state
    this.state = {
      clubs: {},
      events: {},
    };

    firebase
      .database()
      .ref('/club/')
      .once('value')
      .then(clubs => this.setState({ clubs: clubs.val() }));

    firebase
      .database()
      .ref('/event/')
      .once('value')
      .then(events => this.setState({ events: events.val() }));
  }

  render() {
    const clubIDs = Object.keys(this.state.clubs);
    const eventIDs = Object.keys(this.state.events);
    return (
      <div>
        <section className="banner">
          <h1>Millburn HACKS</h1>
        </section>
        <section>
          <h2>Clubs</h2>
          {clubIDs.map(id => <Club key={id} src={this.state.clubs[id]} clubID={id} />)}
        </section>
        <section>
          <h2>Events</h2>
          {eventIDs.map(id => <Event key={id} src={this.state.events[id]} eventID={id} />)}
        </section>
      </div>
    );
  }
}
