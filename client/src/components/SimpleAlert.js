import React from 'react'

class SimpleAlert extends React.Component {
  render() {
    return (
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> <a>You should check in on some of those fields below.</a>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
    )
  }
}
