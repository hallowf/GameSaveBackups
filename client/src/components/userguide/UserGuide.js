import React from 'react'

class UserGuide extends React.Component {
  constructor() {
    super()
    this.callReturnToIndex = this.callReturnToIndex.bind(this)
  }

  callReturnToIndex() {
    this.props.returnToIndex()
  }

  render() {
    return (
      <div class="card">
        <div class="card-header bg-light row justify-content-between">
          <h5 className="card-title">User Guide</h5>
          <button onClick={this.callReturnToIndex} className='btn btn-primary'>Return</button>
        </div>
          <div class="card-body">
            <h5 class="card-title">First screen (Home Screen)</h5>
              <p class="card-text">
                When you run the program you are presented with a home page that gives you
                two options, the one that you choose will determine how the program looks for
                the games in your computer.
                <ul>
                  <li>Make zipped backups</li>
                    <p class="card-text">
                      The ........ button searches your computer for games that don't
                       use steam Sync, the ........ backups creates a zip file with the backups.
                    </p>
                  <li>Use Steam ID</li>
                    <p class="card-text">
                      This option allows you to convert your SteamID to SteamID3 which is the
                      ID that names the folder for the Steam cloud backups.
                    </p>
                </ul>
                If it finds the save files for the games, cards will be displayed with the
                game name, it's save path, and a checkbox that allows you to select if you want
                those saves or not.
              </p>
              <h5 class="card-title">Game Cards</h5>
                <p class="card-text">
                  After you chose the option that best suits your needs, and the game cards have
                  been displayed, you can now proceed to selecting which games you want to add to
                  the backups.
                </p>
                <h5 class="card-title">User Guide</h5>
                  <p class="card-text">
                    The User Guide is meant to help the new users understand how the program works and
                    how to use it ..............
                  </p>
          </div>
      </div>
    )
  }
}

export default UserGuide
