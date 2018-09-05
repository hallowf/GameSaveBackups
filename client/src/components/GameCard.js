import React from "react"

class GameCard extends React.Component {
  constructor(props) {
    super(props)
  }

  callHandleChecked(event) {

  }

  render() {
    return(
      <div className='col-sm-3 p-3'>
        <div className="card bg-secondary game_cards" containerstyle="width:85%; background-color:#eae8ea; margin:1em auto">
          <img className="card-img-top" src={"static/images/gameimgs/" + this.props.gameName + ".jpg"} alt="Game screenshot"/>
          <div className="card-body">
            <h5 className="card-title">{this.props.gameName}</h5>
            <p>Game save path:
              <label className="bg-dark">
                <code className="card-text text-success"> {this.props.gamePath}</code>
              </label>
            </p>
            <p>Steam sync path:
              <label className="bg-dark">
                <code className="card-text text-success"> {this.props.gameSyncPath}</code>
              </label>
            </p>
            <p>
              <label className="btn btn-secondary active">
                <input className ="checkbox" defaultValue=this.props.checkedValue.get(this.props.gameName) onChange={this.callHandleChecked.bind(this)} containerstyle="margin:1em auto" type="checkbox" autoComplete="off"/>
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
