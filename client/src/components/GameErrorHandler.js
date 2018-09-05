
function GameErrorHandler(games) {
  if (games['message'] === 'No games found on this machine') {
    alert(games['message'])
  }
  else if (games['message'] === 'The id/url you submitted is either incorrect or invalid') {
    alert(games['message'])
  }
}

export default GameErrorHandler
