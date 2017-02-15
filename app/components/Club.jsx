import React from 'react';
import firebase from "firebase";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default class Club extends React.Component {
  constructor({ params }) {
    super();

    // set up the default state
    this.state = {
      name: "",
      meetings: [],
      slogan: "",
      officers: {},
      description: ""
    };

    firebase.database().ref(`/club/${params.clubID}`).once("value").then(club => this.setState(club.val()))
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h2>{this.state.slogan}</h2>
        {Object.keys(this.state.meetings).map(day => <p key={days.indexOf(day)}>Meets in {this.state.meetings[day]} on {day}</p>)}
        {Object.keys(this.state.officers).map((person, i) => <p key={i}>{person} is {this.state.officers[person]}</p>)}
        <p>{this.state.description}</p>
      </div>
    );
  }
}
