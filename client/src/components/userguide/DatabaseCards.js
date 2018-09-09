import React from 'react'

class DatabaseCards extends React.Component{
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
                <a className="card-text">Not implemented</a>
              </label>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default DatabaseCards
