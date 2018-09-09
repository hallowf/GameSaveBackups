import React from 'react'
import $ from 'jquery'

class SimpleAlert extends React.Component {
  componentDidMount() {
    $(this.modal).modal({
      show: true,
      backdrop: 'static'
    })
  }
componentWillUnmount() {
  $(this.modal).modal('hide')
}

  render() {
    return (
      <div className="modal" ref={modal=> this.modal = modal} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SimpleAlert
