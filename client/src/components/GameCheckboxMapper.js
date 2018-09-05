function GameCheckboxMapper(checkedGames) {
  checkedGames['game_list'].forEach(function(game){
    checkedGames[game.name] = false
  })
  return checkedGames
}

export default GameCheckboxMapper
