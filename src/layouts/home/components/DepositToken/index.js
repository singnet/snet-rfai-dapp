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

class DepositToken extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.helperFunctions = new HelperFunctions();

    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleDepositButton = this.handleDepositButton.bind(this)

    //this.setTXParamValue = this.setTXParamValue.bind(this)

    // this.props.tknSpender
    this.state = {
      spenderAddress: this.contracts.ServiceRequest.address,
      depositAmount: '',
      dataKeyTokenBalance: null,
      tknBalance: 0,
      dataKeyTokenAllowance: null,
      tknAllowance: 0,
      dataKeyEscrowBalance: null,
      escrowBalance: 0,
      dialogOpen: false,
      alertText: ''
    }
  }

  componentDidMount() {
    // this.setState({invalidAddress: false})
    const dataKeyTokenAllowance = this.contracts.SingularityNetToken.methods["allowance"].cacheCall(this.props.accounts[0], this.state.spenderAddress);
    this.setState({dataKeyTokenAllowance})
    this.setTokenAllowance(this.props.SingularityNetToken)

    const dataKeyTokenBalance = this.contracts.SingularityNetToken.methods.balanceOf.cacheCall(this.props.accounts[0]);
    this.setState({dataKeyTokenBalance})
    this.setTokenBalance(this.props.SingularityNetToken)

    const dataKeyEscrowBalance = this.contracts.ServiceRequest.methods.balances.cacheCall(this.props.accounts[0]);
    this.setState({dataKeyEscrowBalance})
    this.setEscrowBalance(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.SingularityNetToken !== prevProps.SingularityNetToken || this.state.dataKeyTokenAllowance !== prevState.dataKeyTokenAllowance) {
        this.setTokenAllowance(this.props.SingularityNetToken)
    }
    if (this.props.SingularityNetToken !== prevProps.SingularityNetToken || this.state.dataKeyTokenBalance !== prevState.dataKeyTokenBalance) {
      this.setTokenBalance(this.props.SingularityNetToken)
    }
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyEscrowBalance !== prevState.dataKeyEscrowBalance) {
      this.setEscrowBalance(this.props.ServiceRequest)
      this.setTokenAllowance(this.props.SingularityNetToken)
      this.setTokenBalance(this.props.SingularityNetToken)
    }
  }

  setTokenAllowance(contract) {
    if (contract.allowance[this.state.dataKeyTokenAllowance] !== undefined && this.state.dataKeyTokenAllowance !== null) {
      this.setState({
        tknAllowance: contract.allowance[this.state.dataKeyTokenAllowance].value
      })
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

  handleDepositButton() {
    // Only deposit Amount to be converted to Wei AGI format
    var zeroBN = new BN(0)
    var depositAmountBN = new BN(this.helperFunctions.toWei(this.state.depositAmount))
    var balanceBN = new BN(this.state.tknBalance)
    var allowanceBN = new BN(this.state.tknAllowance)

    if(depositAmountBN.gt(zeroBN) && depositAmountBN.lte(balanceBN) && depositAmountBN.lte(allowanceBN)) {
      this.contracts.ServiceRequest.methods["deposit"].cacheSend(depositAmountBN.toString(), {from: this.props.accounts[0]})
    } else if (depositAmountBN.gt(balanceBN)) {
      this.setState({ alertText: 'Oops! You are trying to transfer more than you have.'})
      this.handleDialogOpen()
    } else if (depositAmountBN.gt(allowanceBN)) {
      this.setState({ alertText: 'Oops! You are trying to transfer more than you have approved.'})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  // setTXParamValue(_value) {
  //   if (web3.utils.isBN(_value)) {
  //     this.setState({
  //       depositAmount: _value.toString()
  //     })
  //   } else {
  //     this.setState({
  //       depositAmount: ''
  //     })
  //   }
  // }

  render() {

    const tknBalance = this.helperFunctions.fromWei(this.state.tknBalance)
    const escrowBalance = this.helperFunctions.fromWei(this.state.escrowBalance)
    const tknAllowance = this.helperFunctions.fromWei(this.state.tknAllowance)

    return (
      <div>
        <Paper style={styles} elevation={0} className="singularity-content">
          <p>Deposit Token to RFAI Escrow Contract </p>

          <form className="pure-form pure-form-stacked">
          <div class="row">
            <div class="col-4">
                <div class="singularity-token-counter">
                    <p>Token Balance: <span>{tknBalance} AGI</span></p>
                </div>
            </div>
            <div class="col-4">
                <div class="singularity-token-counter">
                    <p>Balance in Escrow: <span>{escrowBalance} AGI</span></p>
                </div>            
            </div>
            <div class="col-4">
                <div class="singularity-token-counter">
                    <p>Token Allowance: <span>{tknAllowance} AGI</span></p>
                </div>                        
            </div>
          </div>
          <div class="row">
            <div class="col">
                <div class="spacer"></div>
                <label>Tokens to Deposit:</label> <div class="clearfix"></div>
                <input className="singularity-input" name="depositAmount" type="number" placeholder="tokens" autoComplete='off' min={0} value={this.state.depositAmount} onChange={this.handleAmountInputChange} />
            </div>
          </div>
            
            <Button className="singularity-button high-margin singularity-button-blue" type="Button" variant="contained" onClick={this.handleDepositButton}>Deposit</Button>
          </form>
      </Paper>

      <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
        <p>{this.state.alertText}</p>
        <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
      </Dialog>
      </div>
    )
  }
}

DepositToken.contextTypes = {
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
export default drizzleConnect(DepositToken, mapStateToProps)