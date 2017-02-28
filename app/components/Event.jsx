import React from 'react';
import firebase from 'firebase';

// used to convert a numerical month to a written one
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Aug', 'Oct', 'Nov', 'Dec'];

export default class Event extends React.Component {
  constructor({ params }) {
    super();

    // set up the default state
    this.state = {
      name: '',
      date: { yyyy: undefined, mm: undefined, dd: undefined },
      description: '',
      clubID: '',
    };

    // load the event from Firebase's database
    firebase
      .database()
      .ref(`/event/${params.eventID}`)
      .once('value')
      .then(event => this.setState(event.val()));
  }

  dateNode() {
    return this.state.date.yyyy ?
      <h2>{this.state.date.yyyy} {months[this.state.date.mm - 1]} {this.state.date.dd}</h2>
    :
      <div />;
  }

  render() {
    return (
      <div>
        <section className="banner">
          <h1>{this.state.name}</h1>
          {this.dateNode()}
        </section>
        <section>
          <p>{this.state.description}</p>
        </section>
      </div>
    );
  }
}
