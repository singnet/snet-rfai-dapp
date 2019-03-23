import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'

//components
import Button from '@material-ui/core/Button'
import HelperFunctions from '../HelperFunctions'
import TransactionResult from '../TransactionResult'
import { toast } from 'react-toastify';

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
      stackId: null,
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
      this.handleDialogClose();
      
      
      const stackId = this.contracts.ServiceRequest.methods["withdraw"].cacheSend(withdrawAmountBN.toString(), {from: this.props.accounts[0]})
      this.setState({stackId}, () => {this.createToast()});
      
    } else if (withdrawAmountBN.gt(escrrowBalanceBN)) {
      this.setState({ alertText: 'Oops! You are trying to withdraw more than you have in RFAI Escrow.'})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  createToast() {
    const tId = this.helperFunctions.generateRandomKey("wt")
    toast.info(<TransactionResult toastId={tId} key={this.state.stackId} stackId={this.state.stackId} />, { toastId: tId, autoClose: false });
  }

  render() {

    const tknBalance = this.helperFunctions.fromWei(this.state.tknBalance)
    const escrowBalance = this.helperFunctions.fromWei(this.state.escrowBalance)

    return (
      <div className="withdraw-tab-details">
        <div className="rfai-tab-content">
          <form>
            <div className="token-amt-container">
              <input name="withdrawAmount" type="text" placeholder="AGI Token Amount" autoComplete="off" value={this.state.withdrawAmount} onChange={this.handleAmountInputChange} />            
              {
                this.state.withdrawAmount !== '' ? <label>Amount</label> : null
              }
            </div>
            {
              this.state.dialogOpen ? <label className="error-msg">{this.state.alertText}</label> : null
            }          
            <Button className={this.state.withdrawAmount !== '' ? 'blue' : 'disable'} type="Button" onClick={this.handleWithdrawButton}>Withdraw</Button>

          </form>
        </div>
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