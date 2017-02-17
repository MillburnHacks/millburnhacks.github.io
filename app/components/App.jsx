// handles things that are relevant to all pages

import React from 'react';

const App = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
