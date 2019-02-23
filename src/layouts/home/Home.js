import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import components
import LandingPage from './components/LandingPage'
import RequestList from './components/RequestList'
import RequestsTab from './components/RequestsTab'

class Home extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts

    this.handleHomeButton = this.handleHomeButton.bind(this)
    this.handleViewRequest = this.handleViewRequest.bind(this)

    this.state = {
      showLandingPage: true,
      showViewPage: false,
      readonly: true
    }
  }

  handleHomeButton() {
    this.setState({ showLandingPage: true, showViewPage: false })
  }

  handleViewRequest() {
    this.setState({ showLandingPage: false, showViewPage: true })
  }

  render() {
    return (
      <main >
        <LandingPage handlerViewPage={this.handleViewRequest}/>
        {/* The following component is only for Temp Transfers during testing */}
        {/* <RequestList />  */}
        {this.state.showViewPage === true && <div className="main-content"><RequestsTab /></div>}
      </main>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home
