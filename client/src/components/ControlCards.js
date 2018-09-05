import React from 'react'
import UnsyncedGamesCard from './UnsyncedGamesCard.js'
import SyncedGamesCard from './SyncedGamesCard.js'
import GameUtilities from './GameUtilities.js'
import GameMapper from './GameMapper.js'

const baseUrl = window.location.hostname === 'localhost' ?
  window.location.protocol + '//' + document.domain + ':2890/':
  window.location.protocol + '//' + document.domain + ':2890/'

class ControlCards extends React.Component {
  constructor(props) {
    super(props)
    this.searchUnsynced = this.searchUnsynced.bind(this)
    this.searchSynced = this.searchSynced.bind(this)
    this.cleanGames = this.cleanGames.bind(this)
    this.searchFilter = this.searchFilter.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.state = {
      games: '',
      filteredGames: '',
      checkedGames: [],
      userSearch: ''
    }
  }
  handleChecked() {

  }
  searchUnsynced() {
    fetch(baseUrl + 'api/games?all_games=no&user_id=no_id')
      .then(res => res.json()
        .then(games => {
          if (games['message'] === 'No games found on this machine') {
            alert(games['message'])
          }
          else {
            games = GameMapper(games['game_list'])
            this.setState({games})
          }
        })
      )
      .catch(e => {
        this.setState({error: e})
      })
  }
  searchSynced(userID) {
    fetch(baseUrl + 'api/games?all_games=no&user_id=' + userID)
      .then(res => res.json()
        .then(games => {
            if (games['message'] === 'No games found on this machine') {
              alert(games['message'])
            }
            if (games['message'] === 'The id/url you submitted is either incorrect or invalid') {
              alert(games['message'])
            }
            else {
              games = GameMapper(games['game_list'])
              this.setState({games})
            }
        })
      )
      .catch(e => {
        this.setState({error: e})
      })
  }

  searchAll(userID) {
    fetch(baseUrl + 'api/games?all_games=yes&user_id=' + userID)
      .then(res => res.json()
        .then(games => {
            console.log(games)
        })
      )
      .catch(e => {
        this.setState({error: e})
      })
  }

  cleanGames() {
    this.setState({games: ''})
  }

  searchFilter(event) {
    this.setState({userSearch: event.target.value})
    let filteredGames = this.state.games.filter(
      (game) => {
        return game.key.indexOf(this.state.userSearch) !== -1
    })
    this.setState({filteredGames: filteredGames})
  }

  render() {
    let gamesJsx = null
    let gameUtilities = null
    if (this.state.games !== '') {
      gamesJsx = this.state.games
      gameUtilities = <GameUtilities cleanGames={this.cleanGames} searchFilter={this.searchFilter} />
    }
    if (this.state.userSearch !== '') {
      gamesJsx = this.state.filteredGames
    }
    return (
      <div>
        <div className='mt-3'>
          {gameUtilities}
        </div>
        <div className='row mx-auto'>
          {gamesJsx}
        </div>
        <div className='row m-5'>
          <UnsyncedGamesCard searchUnsynced={this.searchUnsynced}/>
          <SyncedGamesCard searchSynced={this.searchSynced}/>
        </div>
      </div>
    )
  }
}

export default ControlCards
