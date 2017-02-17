import React from 'react';
import firebase from "firebase";
import { Link } from "react-router";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Club = ({ src, clubID }) => (
  <div>
    <h3>{src.name}</h3>
    <p>{src.slogan}</p>
    <Link to={`/club/${clubID}`}>See more</Link>
  </div>
)

export default class Home extends React.Component {
  constructor({ params }) {
    super();

    // set up the default state
    this.state = {
      clubs: {}
    };

    firebase.database().ref(`/club/`).once("value").then(clubs => this.setState({ clubs: clubs.val() }))
  }

  render() {
    return (
      <div>
        <h1>Millburn HACKS</h1>

        <h2>Clubs</h2>
        {Object.keys(this.state.clubs).map((clubID, i) => <Club key={i} src={this.state.clubs[clubID]} clubID={clubID} />)}
      </div>
    );
  }
}
