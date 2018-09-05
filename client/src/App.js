import React, { Component } from 'react';
import Navbar from "./components/Navbar"
import ControlCards from "./components/ControlCards"
import Raven from 'raven-js'

Raven.config('https://0fefacd0609d400981c0ddec3fbe806b@sentry.io/1264488').install();

class App extends Component {
  render() {
    return (
        <div>
          <Navbar />
          <ControlCards />
        </div>
    )
  }
}


export default App;
