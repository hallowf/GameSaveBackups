import React from 'react'

class SyncedGamesCard extends React.Component {
  constructor(props) {
    super(props)
    this.callSearchSynced = this.callSearchSynced.bind(this)
    this.callSearchAll = this.callSearchAll.bind(this)
    this.state = {
      userID: ''
    }
  }

  updateID(event) {
    this.setState({userID: event.target.value.substr(0, 60)})
  }
  callSearchSynced() {
    this.props.searchSynced(this.state.userID)
  }
  callSearchAll() {
    this.props.searchAll(this.state.userID)
  }
  render() {
    let simpleAlert = null
    return(
      <div className='col-3 card m-auto'>
        <img className='card-img-top m-2' src='' alt='Steam synced games'/>
        <div className='card-body'>
          <h5 className='card-title'>Search for steam synced games</h5>
          <p className='card-text'>This will search for saves that are synced to steam <a href=''>Learn more</a></p>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              {simpleAlert}
              <input type='text' value={this.state.userID} onChange={this.updateID.bind(this)} className='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-default'/>
            </div>
          </div>
          <button onClick={this.callSearchSynced} className='btn btn-primary'>Search</button>
          <button onClick={this.callSearchAll} className='btn btn-primary'>Search All</button>
        </div>
      </div>
    )
  }
}

export default SyncedGamesCard
