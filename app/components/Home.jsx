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

export default class Home extends React.Component {
  constructor() {
    super();

    // set up the default state
    this.state = {
      clubs: {},
    };

    firebase.database().ref('/club/').once('value').then(clubs => this.setState({ clubs: clubs.val() }));
  }

  render() {
    const clubIDs = Object.keys(this.state.clubs);
    return (
      <div>
        <h1>Millburn HACKS</h1>

        <h2>Clubs</h2>
        {clubIDs.map(id => <Club key={id} src={this.state.clubs[id]} clubID={id} />)}
      </div>
    );
  }
}
