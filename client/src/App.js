import React, { Component } from 'react';
import Navbar from "./components/Navbar"
import ControlCards from "./components/ControlCards"
import Raven from 'raven-js'
import HelpPage from './components/HelpPage'
import { HashRouter as Router, Route ,Link } from "react-router-dom"
import { Switch } from 'react-router-dom'

if (process.env.NODE_ENV !== 'development') {
  Raven.config('https://0fefacd0609d400981c0ddec3fbe806b@sentry.io/1264488').install();
}


class App extends Component {

  render() {
    return (
        <div>

          <header>
            <Router>
              <Navbar Home={<Link to='/'>Home</Link>} HelpPage={<Link to='/Help'>Help</Link>}/>
            </Router>
          </header>

          <main>
            <Router>
              <Switch>
                <Route exact path='/' component={ControlCards} />
                <Route exact path='/Help' component={HelpPage} />
              </Switch>
            </Router>
          </main>

        </div>
    )
  }
}


export default App;
