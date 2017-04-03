import React from 'react';
import firebase from 'firebase';
import CommonMark from 'commonmark';
import ReactRenderer from 'commonmark-react-renderer';

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

    const markdownParser = new CommonMark.Parser();
    const markdownRenderer = new ReactRenderer();

    const descriptionNodes = markdownRenderer.render(markdownParser.parse(this.state.description));
    const descriptionCards = descriptionNodes
      .reduce((cards, node) => {
        if (node.type === 'p') {
          cards[cards.length - 1].push(node);
        }

        if (node.type.name === 'Heading') {
          cards.push([node]);
        }

        return cards;
      }, [])
      .map(card => (
        <div className="card">
          <div className="info">
            {card}
          </div>
        </div>
      ));

    return (
      <div>
        <header>
          <h1>{this.state.name}</h1>
        </header>
        <section className="club">
          <div className="card-wrapper">
            <div className="card">
              <div className="info">
                <h2>Basic Info</h2>
                {meetingDays.map(day => <MeetingDay day={day} key={days.indexOf(day)} />)}
                {officers.map(officer => <Officer officer={officer} key={officer} />)}
              </div>
            </div>
            {descriptionCards}
          </div>
        </section>
      </div>
    );
  }
}
