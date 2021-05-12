import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./Home";
import Chat from './Chat';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Header/>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
    </Switch>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

