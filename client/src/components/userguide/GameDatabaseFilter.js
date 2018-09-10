import React from 'react'


class GameDatabaseFilter extends React.Component {
  constructor() {
    super()
    this.callSearchFilter = this.callSearchFilter.bind(this)
    this.callReturnToIndex = this.callReturnToIndex.bind(this)
  }

  callReturnToIndex() {
    this.props.returnToIndex()
  }

  callSearchFilter (event) {
    this.props.searchFilter(event.target.value)
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row justify-content-between'>
          <div className='input-group col-9'>
            <div className='input-group-prepend'>
              <span className='input-group-text' id='inputGroup-sizing-default'>Search</span>
            </div>
            <input type='text' onChange={this.callSearchFilter} className='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-default'/>
          </div>
          <div>
            <button onClick={this.callReturnToIndex} className='btn btn-primary'>Return</button>
          </div>
        </div>
      </div>
    )
  }
}

export default GameDatabaseFilter
