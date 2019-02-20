import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { ContractData } from 'drizzle-react-components'

//components
import Paper from '@material-ui/core/Paper'

//inline styles
const styles = {
    backgroundColor: '#F9DBDB',
    padding: 20
}

class TokenAllowance extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    // this.props.tknSpender
    this.state = {
      spenderAddress: this.contracts.ServiceRequest.address,
      dataKeyTokenAllowance: null,
      tknAllowance: 0
    }
    
  }

  componentDidMount() {
    // Get the Data Key
    const dataKeyTokenAllowance = this.contracts.SingularityNetToken.methods["allowance"].cacheCall(this.props.accounts[0], this.state.spenderAddress);

    this.setState({dataKeyTokenAllowance})
    this.setTokenAllowance(this.props.SingularityNetToken)
  }

  componentDidUpdate(prevProps) {
    if (this.props.SingularityNetToken !== prevProps.SingularityNetToken) {
      this.setState({ defaultState: false })
        this.setTokenAllowance(this.props.SingularityNetToken)
    }
  }

  setTokenAllowance(contract) {
    if (contract.allowance[this.state.dataKeyTokenAllowance] !== undefined && this.state.dataKeyTokenAllowance !== null) {
      this.setState({
        tknAllowance: contract.allowance[this.state.dataKeyTokenAllowance].value
      })
    }
  }

  fromWei(weiValue) {
    var factor = Math.pow(10, 10)
    var balance = this.context.drizzle.web3.utils.fromWei(weiValue)
    balance = Math.round(balance / factor);
    return balance
  }

  render() {
    
    //var allowanceBalance = this.fromWei(this.contracts.SingularityNetToken.methods["allowance"].cacheCall(this.props.accounts[0], this.state.spenderAddress));
    return (
      <div>
        <Paper style={styles} elevation={5} >
        <h2>Token Allowances for the contract address {this.state.spenderAddress}</h2>
        <p>
          <strong>Allowance Balance: </strong> 
          <ContractData contract="SingularityNetToken" method="allowance" methodArgs={[this.props.accounts[0], this.state.spenderAddress]}/> 
           AGI
        </p>
        {/* <p>Converted Allowance Balance {this.state.tknAllowance}</p> */}
        <br/>
      </Paper>
      </div>
    )

  }
}


TokenAllowance.contextTypes = {
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

export default drizzleConnect(TokenAllowance, mapStateToProps)