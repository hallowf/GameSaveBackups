import React from 'react'


class GameUtilities extends React.Component {
  constructor(props) {
    super(props)
    this.callCleanGames = this.callCleanGames.bind(this)
    this.callSearchFilter = this.callSearchFilter.bind(this)
  }

  callCleanGames() {
    this.props.cleanGames()
  }

  callSearchFilter(event) {
    this.props.searchFilter(event)
  }

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-2'>
            <button className='btn btn-primary' onClick={this.callCleanGames} type='submit'>Clear</button>
          </div>
          <div className='col-4'>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
              </div>
              <input type="text" onChange={this.callSearchFilter} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GameUtilities
