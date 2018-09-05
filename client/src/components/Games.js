import React from 'react'
import Game from './Game'

class Games extends React.Component {
  componentDidMount() {
    fetch('http://localhost:2890/api/games?user_id=' + this.props.userId)
      .then(res => res.json()
        .then(games => {
          this.setState({games})
        })
      )
      .catch(e => {
        this.setState({error: e})
      })
  }
  render() {
    if (this.state && this.state.error) {
      return <span>Error: {this.state.error.message} </span>
    }
    if (!(this.state && this.state.games)) {
      return <span>Loading...</span>
    }
    const gamesJsx = this.state.games.map(game => <Game game={game} />)
    return (
      <div className="App">
        {gamesJsx}
      </div>
    );
  }
}

export default Games
