import React from 'react'

class Features extends React.Component {
  render() {
    return (
      <div class="card" style="width:90%; margin:1em auto">
        <div class="card-header bg-light">
          <h5 class="card-title">Features</h5>
        </div>
          <div class="card-body">
            <h5 class="card-title">Easy to navigate UI</h5>
              <p class="card-text">
                As you probably noticed by now this program looks and feels like a website
                , and it actually uses Google Chrome to display the program and allow you
                to easily interact with it
              </p>
              <h5 class="card-title">Backup steam cloud saves</h5>
                <p class="card-text">
                  Since steam stores the saves for synced games in a very specific folder
                  that is named after the user's Steam_ID3, the program only needs to know
                  your ID3, so I created a simple function that converts your Steam_ID into
                  a Steam_ID3
                </p>
              <h5 class="card-title">All your saves in one zip file or multiple</h5>
                <p class="card-text">
                You can choose to add saves to your xip file, to replace the files inside it,
                or simply create a new zip file
                </p>
          </div>
      </div>
    )
  }
}

export default Features
