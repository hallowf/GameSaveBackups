import React from 'react'
import GameCard from './GameCard.js'


function GameMapper (gameList) {
  let games = gameList.map(game => <GameCard key={game['name']} gameName={game['name']}
                                                                               gamePath={game['path']}
                                                                               gameSyncPath={game['sync_path']}
                                                                               checkedValue={game['name']: false} />)
  return games
}

export default GameMapper
