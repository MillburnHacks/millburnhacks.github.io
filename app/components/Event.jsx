import React from 'react';
import firebase from 'firebase';
import ReactMarkdown from 'react-markdown';

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

    // load the event from Firebase's database and storage
    firebase
      .database()
      .ref(`/event/${params.eventID}`)
      .once('value')
      .then(event => this.setState(event.val()));
    firebase
      .storage()
      .ref(`/event/${params.eventID}`)
      .child('description.md')
      .getDownloadURL()
      .then(fetch)
      .then(response => response.text())
      .then(description => this.setState({ description }));
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
        <title>{this.state.name}</title>
        <section className="banner">
          <h1>{this.state.name}</h1>
          {this.dateNode()}
        </section>
        <section className="description">
          <ReactMarkdown source={this.state.description} />
        </section>
      </div>
    );
  }
}
