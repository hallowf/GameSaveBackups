import React from 'react'
import GameCard from './GameCard.js'


function GameMapper (gameList, handleChecked) {
  let games = gameList['game_list'].map(game => <GameCard key={game['name']} gameName={game['name']}
                                                                               gamePath={game['path']}
                                                                               gameSynced={game['sync_path']}
                                                                               handleChecked={handleChecked} />)
  return games
}

export default GameMapper
