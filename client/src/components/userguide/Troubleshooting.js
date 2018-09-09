import React from 'react'

class Troubleshooting extends React.Component {
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
            <h5 className="card-title">Program not working or behaving as expected</h5>
              <p className="card-text">
                default text
              </p>
            <h5 className="card-title">default text</h5>
              <p className="card-text">
                default text
              </p>
              <p className="card-text">
                default text
              </p>
                <ul>
                  <li>On windows</li>
                    <p>
                      default text
                    </p>
                  <li>On Linux</li>
                    <p>
                      default text
                    </p>
                </ul>
          </div>
      </div>
    )
  }
}

export default Troubleshooting
