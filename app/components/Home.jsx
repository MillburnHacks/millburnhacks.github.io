import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';

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

  componentDidMount() {
    document.title = 'Millburn Hacks';
  }

  render() {
    const clubIDs = Object.keys(this.state.clubs);
    const eventIDs = Object.keys(this.state.events);

    const ClubNode = ({ id }) => (
      <div className="card">
        <div className="header" />
        <div className="info">
          <h3>{this.state.clubs[id].name}</h3>
          <p>{this.state.clubs[id].slogan}</p>
          <Link to={`/club/${id}`}>See more</Link>
        </div>
      </div>
    );

    const EventNode = ({ id }) => (
      <div className="card">
        <div className="header" />
        <div className="info">
          <h3>{this.state.events[id].name}</h3>
          <p>Date: {this.state.events[id].date.mm}-{this.state.events[id].date.dd}</p>
          <Link to={`/event/${id}`}>See more</Link>
        </div>
      </div>
    );

    return (
      <div>
        <header>
          <h1>Millburn HACKS</h1>
        </header>

        <section className="club">
          <h2>Clubs</h2>
          <div className="card-wrapper">
            {clubIDs.map(id => <ClubNode key={id} id={id} />)}
          </div>
        </section>

        <section className="club">
          <h2>Events</h2>
          <div className="card-wrapper">
            {eventIDs.map(id => <EventNode key={id} id={id} />)}
          </div>
        </section>
      </div>
    );
  }
}
