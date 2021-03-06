import React from 'react'


class HelpIndex extends React.Component {
  constructor() {
    super()
    this.callHandleHelpPage = this.callHandleHelpPage.bind(this)
    this.callFetchAllGames = this.callFetchAllGames.bind(this)
  }

  callFetchAllGames (event) {
    this.props.fetchAllGames(event.target.id)
  }

  callHandleHelpPage(event) {
    this.props.handleHelpPage(event.target.id)
  }

  render() {
    return (
      <div className='container mt-5'>

        <div className="row mt-3 mx-auto justify-content-between" align="center">

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="How it works"/>
              <div className="card-body">
                <h5 className="card-title">How It Works</h5>
                <button id='howitworks' onClick={this.callHandleHelpPage} className="btn btn-primary">View</button>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className="card w-75" >
              <img className="card-img-top" src="" alt="How to use"/>
              <div className="card-body">
                <h5 className="card-title">User Guide</h5>
                <button id='userguide' onClick={this.callHandleHelpPage} className="btn btn-primary">View</button>
              </div>
            </div>
          </div>

          <div id='Features' className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Features"/>
              <div className="card-body">
                <h5 className="card-title">Features</h5>
                <button id='features' onClick={this.callHandleHelpPage} className="btn btn-primary">View</button>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-3 mx-auto justify-content-between" align="center">

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Troubleshooting"/>
              <div className="card-body">
                <h5 className="card-title">Troubleshooting</h5>
                <button id='troubleshooting' onClick={this.callHandleHelpPage} className="btn btn-primary">View</button>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Game database"/>
              <div className="card-body">
                <h5 className="card-title">Game Database</h5>
                <button id='gamedatabase' onClick={this.callFetchAllGames} className="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default HelpIndex
