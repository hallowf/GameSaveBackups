import React from 'react'

class UnsyncedGamesCard extends React.Component {
  render() {
    return (
      <div className='col-3 card m-auto'>
        <img className='card-img-top' src='' alt='Unsynced games'/>
        <div className='card-body'>
          <h5 className='card-title'>Search for unsynced games</h5>
          <p className='card-text'>This will search for saves that are not synced to steam <a href=''>Learn more</a></p>
          <button onClick={this.props.searchUnsynced} className='btn btn-primary'>Search</button>
        </div>
      </div>
    )
  }
}


export default UnsyncedGamesCard
