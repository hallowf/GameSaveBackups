import $ from 'jquery'
import React from "react"

class GameCard extends React.Component {

  componentDidMount() {
  $('[data-toggle="tooltip"]').tooltip();
  }

  callHandleChecked(event) {
    this.props.handleChecked(this.props.gameName)
  }

  render() {
    return(
      <div className='col-3 p-3'>
        <div className="card bg-secondary game_cards w-75 mx-auto" containerstyle="background-color:#eae8ea; margin:1em auto">
          <img className="card-img-top" src={"static/images/gameimgs/" + this.props.gameName + ".jpg"} alt="Game screenshot"/>
          <div className="card-body">
            <h5 className="card-title">{this.props.gameName}</h5>
              <button type="button" className="btn btn-secondary active" data-toggle="tooltip" data-placement="bottom" title={this.props.gamePath}>
                Game path
              </button>
            <p>Steam Sync:
              <label className="m-2">
                <a className="card-text"> {this.props.gameSynced}</a>
              </label>
            </p>
            <p>
              <label className="btn btn-secondary active">
                <input className ="checkbox" onChange={this.callHandleChecked.bind(this)} containerstyle="margin:1em auto" type="checkbox" autoComplete="off"/>
                <a>Backup</a>
              </label>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default GameCard
