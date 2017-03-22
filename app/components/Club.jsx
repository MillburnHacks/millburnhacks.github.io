import React from 'react';
import firebase from 'firebase';
import ReactMarkdown from 'react-markdown';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class Club extends React.Component {
  constructor({ params }) {
    super();

    // set up the default state
    this.state = {
      name: '',
      meetings: [],
      slogan: '',
      officers: {},
      description: '',
    };

    firebase
      .database()
      .ref(`/club/${params.clubID}`)
      .once('value')
      .then(club => this.setState(club.val()))
      .then(() => { document.title = this.state.name; });

    firebase
      .storage()
      .ref(`/club/${params.clubID}`)
      .child('description.md')
      .getDownloadURL()
      .then(fetch)
      .then(response => response.text())
      .then(description => this.setState({ description }));
  }

  render() {
    const MeetingDay = ({ day }) => (
      <div>
        <p>Meets in {this.state.meetings[day]} on {day}</p>
      </div>
    );
    const Officer = ({ officer }) => (
      <div>
        <p> {officer} is {this.state.officers[officer]} </p>
      </div>
    );

    const meetingDays = Object.keys(this.state.meetings);
    const officers = Object.keys(this.state.officers);
    return (
      <div>
        <section className="banner">
          <h1>{this.state.name}</h1>
          <h2>{this.state.slogan}</h2>
        </section>
        <section className="description">
          {meetingDays.map(day => <MeetingDay day={day} key={days.indexOf(day)} />)}
          {officers.map(officer => <Officer officer={officer} key={officer} />)}
          <ReactMarkdown source={this.state.description} />
        </section>
      </div>
    );
  }
}