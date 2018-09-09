import React from 'react'


class GameDatabaseFilter extends React.Component {
  constructor() {
    super()
    this.callSearchFilter = this.callSearchFilter.bind(this)
  }

  callSearchFilter (event) {
    this.props.searchFilter(event.target.value)
  }

  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
        </div>
        <input type="text" onChange={this.callSearchFilter} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
      </div>
    )
  }
}

export default GameDatabaseFilter
