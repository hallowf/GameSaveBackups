import React from 'react'
import UserGuideIndex from './userguide/UserGuideIndex.js'


class HelpPage extends React.Component {
  constructor() {
    super()
    this.handleHelpPage = this.handleHelpPage.bind(this)
    this.state = {
      page: 'index'
    }
  }

  handleHelpPage(page) {
    console.log(page)
  }

  render () {
    let page = null
    if (this.state.page === 'index') {
      page = <UserGuideIndex handleHelpPage={this.handleHelpPage}/>
    }
    return (
      <div>
        {page}
      </div>
    )
  }
}

export default HelpPage
