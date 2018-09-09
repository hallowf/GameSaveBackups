import React from "react"

class Navbar extends React.Component {
  render () {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <a className="navbar-brand" href="">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item p-2">
              {this.props.Home}
            </li>
            <li className="nav-item p-2">
              {this.props.HelpPage}
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
