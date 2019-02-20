import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// import components
import TransferToken from '../../components/TransferToken'

class RequestList extends Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h2>Transfer Token</h2>
          <TransferToken tknBalance="100000000000000000" />
        </div>
      </div>
    )
  }
}

RequestList.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SingularityNetToken: state.contracts.SingularityNetToken,
    ServiceRequest: state.contracts.ServiceRequest,
    drizzleStatus: state.drizzleStatus,
    transactionStack: state.transactionStack,
    transactions: state.transactions
  }
}

export default drizzleConnect(RequestList, mapStateToProps)
