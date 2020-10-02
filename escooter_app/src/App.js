import React from 'react';
import './App.css';
import Header from './Header.js'
import Login from './Login.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
          <h1>I AM HOMEPAGE</h1>
          </Route>
          
        </Switch>

      </Router>

    </div>
  );
}

export default App;
