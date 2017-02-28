// handles things that are relevant to all pages

import React from 'react';

window.onbeforeunload = () => window.scrollTo(0, 0);

const App = ({ children }) => (
  <div className="page">
    <div>{children}</div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
