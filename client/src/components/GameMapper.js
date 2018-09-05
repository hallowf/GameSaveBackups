import React, {Component} from 'react'
import GameCard from './GameCard.js'


function GameMapper (gameList) {
  let games = gameList.map(game => <GameCard key={game['name']} gameName={game['name']}
                                                                               gamePath={game['path']}
                                                                               gameSyncPath={game['sync_path']} />)
  return games
}

export default GameMapper
