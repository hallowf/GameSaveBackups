function GameCheckboxMapper(checkedGames) {
  let checkedArray = {}
  checkedGames['game_list'].forEach(function(game){
    checkedArray[game.name] = false
  })
  return checkedArray
}

export default GameCheckboxMapper
