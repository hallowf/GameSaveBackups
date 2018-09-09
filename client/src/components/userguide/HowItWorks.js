import React from 'react'

class HowItWorks extends  React.Component {
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
          <h5 className="card-title">How It Works</h5>
          <button onClick={this.callReturnToIndex} className='btn btn-primary'>Return</button>
        </div>
          <div className="card-body">
            <h5 className="card-title">What functions run and what do they do</h5>
              <p className="card-text">
                some default text
              </p>
          </div>
      </div>
    )
  }
}

export default HowItWorks
