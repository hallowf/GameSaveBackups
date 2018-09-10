import React from 'react'
import HelpIndex from './userguide/HelpIndex.js'
import Features from './userguide/Features.js'
import Troubleshooting from './userguide/Troubleshooting.js'
import UserGuide from './userguide/UserGuide.js'
import HowItWorks from './userguide/HowItWorks.js'
import DatabaseCards from './userguide/DatabaseCards.js'
import GameDatabaseFilter from './userguide/GameDatabaseFilter.js'

const baseUrl = window.location.hostname === 'localhost' ?
  window.location.protocol + '//' + document.domain + ':2890/':
  window.location.protocol + '//' + document.domain + '/'


class HelpPage extends React.Component {
  constructor() {
    super()
    this.handleHelpPage = this.handleHelpPage.bind(this)
    this.returnToIndex = this.returnToIndex.bind(this)
    this.fetchAllGames = this.fetchAllGames.bind(this)
    this.searchFilter = this.searchFilter.bind(this)
    this.state = {
      page: 'index',
      games: '',
      filteredGames: '',
      userSearch: ''
    }
  }

  fetchAllGames (page) {
    fetch(baseUrl + 'api/games?all_games=no&user_id=no_id&route_testing=2')
      .then(res => res.json()
        .then(games => {
          games = games['game_list'].map(game =>
            <DatabaseCards key={game['name']} gameName={game['name']} gamePath={game['path']}/>
          )
          this.setState({games})
        })
      )
      .catch(e => {
        this.setState({error: e})
      })
  }

  searchFilter(value) {
    this.setState({userSearch: value})
    let filteredGames = this.state.games.filter(
      (game) => {
        return game.key.indexOf(this.state.userSearch) !== -1
    })
    this.setState({filteredGames: filteredGames})
  }

  returnToIndex() {
    this.setState({page: 'index'})
    this.setState({games: ''})
    this.setState({filteredGames: ''})
  }

  handleHelpPage(page) {
    this.setState({page})
  }

  render () {
    let page = null
    let gameDatabaseUtilities = null
    if (this.state.page === 'index' || this.state.page !== '') {
      page = <HelpIndex handleHelpPage={this.handleHelpPage} fetchAllGames={this.fetchAllGames}/>
    }
    if (this.state.page === 'features') {
      page = <Features returnToIndex={this.returnToIndex}/>
    }
    if (this.state.page === 'troubleshooting') {
      page = <Troubleshooting returnToIndex={this.returnToIndex}/>
    }
    if (this.state.page === 'userguide') {
      page = <UserGuide returnToIndex={this.returnToIndex}/>
    }
    if (this.state.page === 'howitworks') {
      page = <HowItWorks returnToIndex={this.returnToIndex}/>
    }
    if (this.state.games !== '') {
      page = <div className='row'>{this.state.games}</div>
      gameDatabaseUtilities = <GameDatabaseFilter searchFilter={this.searchFilter} returnToIndex={this.returnToIndex}/>
    }
    if (this.state.userSearch !== '') {
      page = <div className='row'>{this.state.filteredGames}</div>
    }

    return (
      <div>
        {gameDatabaseUtilities}
        {page}
      </div>
    )
  }
}

export default HelpPage
