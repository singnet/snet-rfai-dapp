import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import { AccountData, ContractData } from 'drizzle-react-components'

//components
import Paper from '@material-ui/core/Paper'

//inline styles
const styles = {
    backgroundColor: '#F9DBDB',
    padding: 20
}

class Account extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts

    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      dataKeyTokenBalance: null,
      tknBalance: 0
    }

    // Get the Data Key
    //this.dataKey = this.contracts.SingularityNetToken.methods.balanceOf.cacheCall(this.props.accounts[0]);

  }

  componentDidMount() {
    // Get the Data Key
    const dataKeyTokenBalance = this.contracts.SingularityNetToken.methods.balanceOf.cacheCall(this.props.accounts[0]);

    this.setState({dataKeyTokenBalance})
    this.setTokenBalance(this.props.SingularityNetToken)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.SingularityNetToken !== prevProps.SingularityNetToken || this.state.dataKeyTokenBalance !== prevState.dataKeyTokenBalance) {
      this.setState({ defaultState: false })
        this.setTokenBalance(this.props.SingularityNetToken)
    }
  }

  setTokenBalance(contract) {
    if (contract.balanceOf[this.state.dataKeyTokenBalance] !== undefined && this.state.dataKeyTokenBalance !== null) {
      this.setState({
        tokenBalance: contract.balanceOf[this.state.dataKeyTokenBalance].value
      })
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  // fromWei(weiValue) {
  //   var factor = Math.pow(10, 10)
  //   var balance = this.context.drizzle.web3.utils.fromWei(weiValue)
  //   balance = Math.round(balance / factor);
  //   return balance
  // }

  render() {

    /*
    var tokenBalance = 0;
    if(this.dataKey in this.props.SingularityNetToken.balanceOf) {

      tokenBalance = this.props.SingularityNetToken.balanceOf[this.dataKey].value

     }
     */
    return (
      <div>
        <Paper style={styles} elevation={5} >
        <h2>Active Account</h2>
        <AccountData accountIndex="0" units="ether" precision="4" />
        <p>
          <strong>Token Balance: </strong> 
          <ContractData contract="SingularityNetToken" units="8" method="balanceOf" methodArgs={[this.props.accounts[0]]}/> 
          {/* this.props.tknBalance */} AGI
        </p>
        <p>Converted Token Balance {this.state.tokenBalance}</p>

        <p>
          <strong>Singularity Net Token Balance in the Escrow RFAI Contract: </strong> 
          <ContractData contract="ServiceRequest" method="balances" methodArgs={[this.props.accounts[0]]}/> 
          {/* this.props.tknBalance */} AGI
        </p>

        <br/>
      </Paper>
      </div>
    )

  }
}


Account.contextTypes = {
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

export default drizzleConnect(Account, mapStateToProps)