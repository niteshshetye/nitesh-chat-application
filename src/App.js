import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Garab the component
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
};

export default App;
