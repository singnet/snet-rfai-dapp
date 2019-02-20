import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'
import { ContractData } from 'drizzle-react-components'

//components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
//import InvalidAddressModal from '../InvalidAddressModal'
import Dialog from '@material-ui/core/Dialog'
import HelperFunctions from '../HelperFunctions'

//inline styles
const styles = {
    backgroundColor: '#F9DBDB',
    padding: 20
}

const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const BN = web3.utils.BN

class TransferToken extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.helperFunctions = new HelperFunctions();

    this.handleRecipientInputChange = this.handleRecipientInputChange.bind(this)
    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleTransferButton = this.handleTransferButton.bind(this)
    this.handleSetMaxButton = this.handleSetMaxButton.bind(this)
    
    // this.setTXParamValue = this.setTXParamValue.bind(this)

    this.state = {
      dialogOpen: false,
      recipientAddress: '',
      transferAmount: '',
      alertText: ''
    }
  }

  componentDidMount() {
    this.setState({invalidAddress: false})
  }

  handleRecipientInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
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

  handleTransferButton() {
    var amountBN = new BN(this.helperFunctions.toWei(this.state.transferAmount)) 
    var balanceBN = new BN(this.props.tknBalance)
    if(this.context.drizzle.web3.utils.isAddress(this.state.recipientAddress) && amountBN.lte(balanceBN)) {
      this.contracts.SingularityNetToken.methods["transfer"].cacheSend(this.state.recipientAddress, amountBN.toString(), {from: this.props.accounts[0]})
    } else if (!this.context.drizzle.web3.utils.isAddress(this.state.recipientAddress)) {
      this.setState({ alertText: `Oops! The receipient address isn't a correct ethereum address.`})
      this.handleDialogOpen()
    } else if (amountBN.gt(balanceBN)) {
      this.setState({ alertText: 'Oops! You are trying to transfer more than you have.'})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  handleSetMaxButton() {
    this.setState({
      transferAmount: this.props.tknBalance
    })
  }

  // setTXParamValue(_value) {
  //   if (web3.utils.isBN(_value)) {
  //     this.setState({
  //       transferAmount: _value.toString()
  //     })
  //   } else {
  //     this.setState({
  //       transferAmount: ''
  //     })
  //   }
  // }

  render() {

    return (
      <div>
        <Paper style={styles} elevation={5}>
          <p><strong>Name: </strong> <ContractData contract="SingularityNetToken" method="name" /></p>

          <p><strong>Symbol: </strong> <ContractData contract="SingularityNetToken" method="symbol" /></p>
          <p>Balance: {this.props.tknBalance}</p>
          <p><Button type="Button" variant="contained" onClick={this.handleSetMaxButton}>Use Balance</Button></p>

          <form className="pure-form pure-form-stacked">
            <input name="recipientAddress" type="text" placeholder="Send to:" value={this.state.recipientAddress} onChange={this.handleRecipientInputChange} />
            <input name="transferAmount" type="text" placeholder="token to transfer:" value={this.state.transferAmount} onChange={this.handleAmountInputChange} />
            <Button type="Button" variant="contained" onClick={this.handleTransferButton}>Transfer</Button>
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

TransferToken.contextTypes = {
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
export default drizzleConnect(TransferToken, mapStateToProps)