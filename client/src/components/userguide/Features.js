import React from 'react'

class Features extends React.Component {
  constructor() {
    super()
    this.callReturnToIndex = this.callReturnToIndex.bind(this)
  }

  callReturnToIndex() {
    this.props.returnToIndex()
  }

  render() {
    return (
      <div className="card">
        <div className="card-header bg-light row justify-content-between">
          <h5 className="card-title">Features</h5>
          <button onClick={this.callReturnToIndex} className='btn btn-primary'>Return</button>
        </div>
          <div className="card-body">
            <h5 className="card-title">Easy to navigate UI</h5>
              <p className="card-text">
                As you probably noticed by now this program looks and feels like a website
                ,
              </p>
              <h5 className="card-title">Backup steam cloud saves</h5>
                <p className="card-text">
                  Since steam stores the saves for synced games in a specific folder
                  that is named after the users Steam_ID3, the program only needs to know
                  your ID3, so the converts your Steam_ID into a Steam_ID3
                </p>
              <h5 className="card-title">All your saves in one zip file or multiple</h5>
                <p className="card-text">
                You can choose to add saves to your zip file, to replace the files inside it,
                or simply create a new zip file
                </p>
          </div>
      </div>
    )
  }
}

export default Features
