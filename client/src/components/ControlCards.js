import React from 'react'
import UnsyncedGamesCard from './gameutilities/UnsyncedGamesCard.js'
import SyncedGamesCard from './gameutilities/SyncedGamesCard.js'
import GameUtilities from './gameutilities/GameUtilities.js'
import GameMapper from './gameutilities/GameMapper.js'
import GameCheckboxMapper from './gameutilities/GameCheckboxMapper.js'
import GameErrorHandler from './gameutilities/GameErrorHandler.js'
import SimpleAlert from './SimpleAlert.js'

const baseUrl = window.location.hostname === 'localhost' ?
  window.location.protocol + '//' + document.domain + ':2890/':
  window.location.protocol + '//' + document.domain + '/'

class ControlCards extends React.Component {
  constructor(props) {
    super(props)
    this.searchUnsynced = this.searchUnsynced.bind(this)
    this.searchSynced = this.searchSynced.bind(this)
    this.searchAll = this.searchAll.bind(this)
    this.cleanGames = this.cleanGames.bind(this)
    this.searchFilter = this.searchFilter.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.requestBackup = this.requestBackup.bind(this)
    this.state = {
      games: '',
      filteredGames: '',
      checkedGames: {},
      waitingBackups: 'no',
      userSearch: ''
    }
  }
  handleChecked(gameName) {
    let checkedGames = this.state.checkedGames
    if (gameName in checkedGames) {
      checkedGames[gameName] = !checkedGames[gameName]
    }
    this.setState({checkedGames})
  }
  searchUnsynced() {
    fetch(baseUrl + 'api/games?all_games=no&user_id=no_id')
      .then(res => res.json()
        .then(games => {
          GameErrorHandler(games)
          let checkedGames = GameCheckboxMapper(games)
          this.setState({checkedGames})
          games = GameMapper(games, this.handleChecked)
          this.setState({games})
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
            GameErrorHandler(games)
            let checkedGames = GameCheckboxMapper(games)
            this.setState({checkedGames})
            games = GameMapper(games, this.handleChecked)
            this.setState({games})
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
          GameErrorHandler(games)
          let checkedGames = GameCheckboxMapper(games)
          this.setState({checkedGames})
          games = GameMapper(games, this.handleChecked)
          this.setState({games})
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
  requestBackup() {
    let checkedGames = this.state.checkedGames
    this.setState({waitingBackups: 'yes'})
    checkedGames = JSON.stringify(checkedGames)
    fetch(baseUrl + 'api/backup',
    {
      method: 'POST',
      body: checkedGames
    }).then(response => {
      this.setState({waitingBackups: 'no'})
    })
  }
  render() {
    let gamesJsx = null
    let gameUtilities = null
    let waitingBackups = null
    if (this.state.games !== '') {
      gamesJsx = this.state.games
      gameUtilities = <GameUtilities cleanGames={this.cleanGames} requestBackup={this.requestBackup} searchFilter={this.searchFilter} />
    }
    if (this.state.userSearch !== '') {
      gamesJsx = this.state.filteredGames
    }
    if (this.state.waitingBackups === 'yes') {
      waitingBackups = <SimpleAlert />
    }
    return (
      <div>
        {waitingBackups}
        <div className='mt-3'>
          {gameUtilities}
        </div>
        <div className='row mx-auto'>
          {gamesJsx}
        </div>
        <div className='row m-5'>
          <UnsyncedGamesCard searchUnsynced={this.searchUnsynced}/>
          <SyncedGamesCard searchSynced={this.searchSynced} searchAll={this.searchAll}/>
        </div>
      </div>
    )
  }
}

export default ControlCards
