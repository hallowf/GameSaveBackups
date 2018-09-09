import React from 'react'

class HelpPage extends React.Component {
  render () {
    return (
      <div className='container'>

        <div className="row mt-3 mx-auto justify-content-between" align="center">
          <div className='col-sm-4'>
            <div className="card w-75" >
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">How To Use</h5>
                <a href="howToUse.html" className="btn btn-primary">Basic usage</a>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Features</h5>
                <a href="features.html" className="btn btn-primary">Needs</a>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">How It Works</h5>
                <a href="howItWorks.html" className="btn btn-primary">The code</a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 mx-auto justify-content-between" align="center">
          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">How it was built</h5>
                <a href="howItWasBuilt.html" className="btn btn-primary">Needs</a>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Help</h5>
                <a href="help.html" className="btn btn-primary">Needs</a>
              </div>
            </div>
          </div>

          <div className='col-sm-4'>
            <div className="card w-75">
              <img className="card-img-top" src="" alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">Game Database</h5>
                <a href="gameDatabase.html" className="btn btn-primary">Open</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default HelpPage
