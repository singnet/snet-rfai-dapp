import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'

//components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import HelperFunctions from '../HelperFunctions'
import RFAITabContent from '../RFAITabContent';

//inline styles
const styles = {
    padding: 20,
    boxShadow:'none',
    borderRadius:0
}

const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const BN = web3.utils.BN

class ApproveToken extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.helperFunctions = new HelperFunctions();

    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleApproveButton = this.handleApproveButton.bind(this)

    // this.setTXParamValue = this.setTXParamValue.bind(this)

    // this.props.tknSpender
    this.state = {
      spenderAddress: this.contracts.ServiceRequest.address,
      dataKeyTokenAllowance: null,
      tknAllowance: 0,
      approveAmount: '',
      dialogOpen: false,
      alertText: ''
    }

  }

  componentDidMount() {
    const dataKeyTokenAllowance = this.contracts.SingularityNetToken.methods["allowance"].cacheCall(this.props.accounts[0], this.state.spenderAddress);
    this.setState({dataKeyTokenAllowance})
    this.setTokenAllowance(this.props.SingularityNetToken)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.SingularityNetToken !== prevProps.SingularityNetToken || this.state.dataKeyTokenAllowance !== prevState.dataKeyTokenAllowance) {
        this.setTokenAllowance(this.props.SingularityNetToken)
    }
  }

  setTokenAllowance(contract) {
    if (contract.allowance[this.state.dataKeyTokenAllowance] !== undefined && this.state.dataKeyTokenAllowance !== null) {
console.log("contract.allowance[this.state.dataKeyTokenAllowance].value - " + contract.allowance[this.state.dataKeyTokenAllowance].value)      
      this.setState({
        tknAllowance: contract.allowance[this.state.dataKeyTokenAllowance].value
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

  handleApproveButton() {
    var zeroBN = new BN(0)
    var approveAmountBN = new BN(this.helperFunctions.toWei(this.state.approveAmount))
    var allowanceBN = new BN(this.state.tknAllowance)

    if(approveAmountBN.gt(zeroBN) && approveAmountBN.gt(allowanceBN)) {
      this.contracts.SingularityNetToken.methods["approve"].cacheSend(this.state.spenderAddress, approveAmountBN.toString(), {from: this.props.accounts[0]})
    } else if(approveAmountBN.lte(allowanceBN)) {
      this.setState({ alertText: 'Oops! Approval amount should be more than current allowances.'})
      this.handleDialogOpen()
    }
    else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  // setTXParamValue(_value) {
  //   if (web3.utils.isBN(_value)) {
  //     this.setState({
  //       approveAmount: _value.toString()
  //     })
  //   } else {
  //     this.setState({
  //       approveAmount: ''
  //     })
  //   }
  // }

  render() {

    const tknAllowance = this.helperFunctions.fromWei(this.state.tknAllowance)

    return (
      <div className="approve-token-tab-details">
        <RFAITabContent
          buttonLabel = 'approve' />
      </div>
    )
  }
}

ApproveToken.contextTypes = {
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
export default drizzleConnect(ApproveToken, mapStateToProps)