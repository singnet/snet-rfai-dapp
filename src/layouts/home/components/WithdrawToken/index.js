import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'

//components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import HelperFunctions from '../HelperFunctions'

//inline styles
const styles = {
    padding: 20,
    boxShadow:'none',
    borderRadius:0,
}

const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const BN = web3.utils.BN

class WithdrawToken extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.helperFunctions = new HelperFunctions();

    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleWithdrawButton = this.handleWithdrawButton.bind(this)

    // this.setTXParamValue = this.setTXParamValue.bind(this)

    // this.props.tknSpender
    this.state = {
      spenderAddress: this.contracts.ServiceRequest.address,
      withdrawAmount: '',
      dataKeyTokenBalance: null,
      tknBalance: 0,
      dataKeyEscrowBalance: null,
      escrowBalance: 0,
      dialogOpen: false,
      alertText: ''
    }
  }

  componentDidMount() {
    const dataKeyTokenBalance = this.contracts.SingularityNetToken.methods.balanceOf.cacheCall(this.props.accounts[0]);
    this.setState({dataKeyTokenBalance})
    this.setTokenBalance(this.props.SingularityNetToken)

    const dataKeyEscrowBalance = this.contracts.ServiceRequest.methods.balances.cacheCall(this.props.accounts[0]);
    this.setState({dataKeyEscrowBalance})
    this.setEscrowBalance(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.SingularityNetToken !== prevProps.SingularityNetToken || this.state.dataKeyTokenBalance !== prevState.dataKeyTokenBalance) {
      this.setTokenBalance(this.props.SingularityNetToken)
    }
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyEscrowBalance !== prevState.dataKeyEscrowBalance) {
      this.setEscrowBalance(this.props.ServiceRequest)
    }
  }

  setTokenBalance(contract) {
    if (contract.balanceOf[this.state.dataKeyTokenBalance] !== undefined && this.state.dataKeyTokenBalance !== null) {
      this.setState({
        tknBalance: contract.balanceOf[this.state.dataKeyTokenBalance].value
      })
    }
  }

  setEscrowBalance(contract) {
    if (contract.balances[this.state.dataKeyEscrowBalance] !== undefined && this.state.dataKeyEscrowBalance !== null) {
      this.setState({
        escrowBalance: contract.balances[this.state.dataKeyEscrowBalance].value
      })
    }
  }

  handleAmountInputChange(event) {
    //  Fixed to two decimal places
    if (event.target.value.match(/^\d+(\.\d{1,2})?$/)) {
      this.setState({ [event.target.name]: event.target.value })
    } else if(event.target.value === '') {
      this.setState({ [event.target.name]: '' })
    } else {
      // Just Ignore the value
    }
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleWithdrawButton() {

    var zeroBN = new BN(0)
    var withdrawAmountBN = new BN(this.helperFunctions.toWei(this.state.withdrawAmount))
    var escrrowBalanceBN = new BN(this.state.escrowBalance)

    if(withdrawAmountBN.gt(zeroBN) && withdrawAmountBN.lte(escrrowBalanceBN)) {
      this.contracts.ServiceRequest.methods["withdraw"].cacheSend(withdrawAmountBN.toString(), {from: this.props.accounts[0]})
    } else if (withdrawAmountBN.gt(escrrowBalanceBN)) {
      this.setState({ alertText: 'Oops! You are trying to withdraw more than you have in RFAI Escrow.'})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  // setTXParamValue(_value) {
  //   if (web3.utils.isBN(_value)) {
  //     this.setState({
  //       withdrawAmount: _value.toString()
  //     })
  //   } else {
  //     this.setState({
  //       withdrawAmount: ''
  //     })
  //   }
  // }

  render() {

    const tknBalance = this.helperFunctions.fromWei(this.state.tknBalance)
    const escrowBalance = this.helperFunctions.fromWei(this.state.escrowBalance)

    return (
      <div>
        <Paper style={styles} elevation={0} className="singularity-content">
          <p>Withdraw Token from RFAI Escrow Contract </p>

          <form className="pure-form pure-form-stacked">
          <div className="row">
            <div className="col-6">
                <div className="singularity-token-counter">
                    <p>Token Balance: <span>{tknBalance} AGI</span></p>
                </div>            
            </div>
            <div className="col-6">
                <div className="singularity-token-counter">
                    <p>Balance in Escrow: <span>{escrowBalance} AGI</span></p>
                </div>              
            </div>
          </div>
          <div className="row">
            <div className="col">
                <div className="spacer"></div>
                <label>Tokens to Withdraw:</label> <div className="clearfix"></div>            
                <input className="singularity-input" name="withdrawAmount" type="number" placeholder="tokens" autoComplete='off' min={0} value={this.state.withdrawAmount} onChange={this.handleAmountInputChange} />            
            </div>
          </div>
            
            <Button className="singularity-button high-margin singularity-button-blue" type="Button" variant="contained" onClick={this.handleWithdrawButton}>Withdraw</Button>
          </form>
          {/* <p>Tokens to deposit: {depositGroomed} </p> */}
      </Paper>

      <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
        <p>{this.state.alertText}</p>
        <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
      </Dialog>
      </div>
    )
  }
}

WithdrawToken.contextTypes = {
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
export default drizzleConnect(WithdrawToken, mapStateToProps)