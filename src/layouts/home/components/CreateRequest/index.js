import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'

//components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import TransactionResult from '../TransactionResult'
import HelperFunctions from '../HelperFunctions'

//inline styles
const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const BN = web3.utils.BN

class CreateRequest extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleRequestInputChange = this.handleRequestInputChange.bind(this)
    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleBlockNumInputChange = this.handleBlockNumInputChange.bind(this)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleCreateButton = this.handleCreateButton.bind(this)

    this.state = {
      dialogOpen: false,
      initialStake: 0,
      expiration: 0,
      documentURI: '',
      dataKeyTokenBalance: null,
      tknBalance: 0,
      blockNumber: 0,
      stackId: null,
      showStatus: false,
      alertText: ''
    }

    this.setBlockNumber();

  }

  componentDidMount() {
    // Get the Data Key
    const dataKeyTokenBalance = this.contracts.ServiceRequest.methods.balances.cacheCall(this.props.accounts[0]);

    this.setState({dataKeyTokenBalance})
    this.setTokenBalance(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || prevState.dataKeyTokenBalance !== this.state.dataKeyTokenBalance) {
        this.setBlockNumber();
        this.setTokenBalance(this.props.ServiceRequest)
    }
  }


  setBlockNumber() {
    // Update the Block Number
    this.context.drizzle.web3.eth.getBlockNumber((err, blockNumber) => {
      this.setState({blockNumber});
    });
  }

  setTokenBalance(contract) {
    if (contract.balances[this.state.dataKeyTokenBalance] !== undefined && this.state.dataKeyTokenBalance !== null) {
      this.setState({
        tokenBalance: contract.balances[this.state.dataKeyTokenBalance].value
      })
    }
  }
  
  handleRequestInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlockNumInputChange(event) {
    if (event.target.value.match(/^[0-9]{1,40}$/)) {
      this.setState({ [event.target.name]: event.target.value })
    } else if(event.target.value === '') {
      this.setState({ [event.target.name]: '' })
    } else {
      // Just Ignore the value
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
  
//   handleAmountInputChange(event) {
//     if (event.target.value.match(/^[0-9]{1,40}$/)) {
//       var amount = new BN(event.target.value)
//       if (amount.gt(0)) {
//         this.setState({ [event.target.name]: event.target.value })
//       } else {
//         this.setState({ [event.target.name]: 0 })
//       }
//     } else if(event.target.value === '') {
//       this.setState({ [event.target.name]: '' })
//     }
//   }

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleCreateButton() {

    //value, expiration, documentURI 
    var zeroBN = new BN(0)
    var initialStakeBN = new BN(this.helperFunctions.toWei(this.state.initialStake))
    var tokenBalanceBN = new BN(this.state.tokenBalance)

    const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.documentURI);


    console.log("this.state.initialStake - " + this.state.initialStake)
    console.log("this.helperFunctions.toWei(this.state.initialStake) - " + this.helperFunctions.toWei(this.state.initialStake))
    console.log("initialStakeBN - " + initialStakeBN.toString())

    if(this.state.documentURI.length > 0 && 
      initialStakeBN.gt(zeroBN) && 
      initialStakeBN.lte(tokenBalanceBN) && 
      parseInt(this.state.expiration,10) > parseInt(this.state.blockNumber,10)) {
      const stackId = this.contracts.ServiceRequest.methods["createRequest"].cacheSend(initialStakeBN.toString(), this.state.expiration, docURIinBytes, {from: this.props.accounts[0]})

      this.setState({stackId});
      this.setState({loadingIndicator: true});
      this.setState({showStatus: true});

    } else if (initialStakeBN.lte(zeroBN) || initialStakeBN.gte(tokenBalanceBN)) {
      this.setState({ alertText: `Oops! You dont have enough token balance in RFAI Escrow.`})
      this.handleDialogOpen()
    } else if (this.state.expiration === '' || parseInt(this.state.expiration,10) < parseInt(this.state.blockNumber,10)) {
      this.setState({ alertText: `Oops! Expiration should be great than current blocknumber.`})
      this.handleDialogOpen()  
    }else if (this.state.documentURI.length === 0) {
      this.setState({ alertText: `Oops! It is invalid document URI.`})
      this.handleDialogOpen()  
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }

  }

  render() {
 
    return (
      <div>
        {/* <Paper style={styles} elevation={5}> */}
          <form className="pure-form pure-form-stacked">
          <div className="singularity-content">
            <div classN="row">
                <div className="col">
                    <label>Tokens to stake:</label><div className="clearfix"></div>
                    <input className="singularity-input" name="initialStake" type="number" placeholder="Tokens to stake:" autoComplete='off' min={0} value={this.state.initialStake} onChange={this.handleAmountInputChange} />            
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="spacer"></div>                
                    <label>Expiration block number:</label><div className="clearfix"></div>
                    <input className="singularity-input" name="expiration" type="number" placeholder="Expiration block number:" autoComplete='off' value={this.state.expiration} min={this.state.blockNumber} onChange={this.handleBlockNumInputChange} /> 
                </div>
            </div>
            <div className="row">            
                <div className="col">
                    <div className="spacer"></div>                
                    <label>Current Blocknumber: {this.state.blockNumber}</label> <div className="clearfix"></div>
                </div>
            </div>    
            <div className="row">
                <div className="col">
                    <div className="spacer"></div>                
                    <label>Document URI:</label><div className="clearfix"></div>
                    <input className="singularity-input" name="documentURI" type="text" placeholder="document URI:" autoComplete='off' value={this.state.documentURI} onChange={this.handleRequestInputChange} /><br/><br/>            
                </div>
            </div>    
            
            


            <button type="button" className="blue" onClick={this.handleCreateButton}>Submit</button>
            </div>
          </form>
        {/* </Paper> */}

        { this.state.showStatus ? <TransactionResult key={this.state.stackId} stackId={this.state.stackId} /> : null }

      <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
        <p>{this.state.alertText}</p>
        <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
      </Dialog>

      </div>
    )
  }
}

CreateRequest.contextTypes = {
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
export default drizzleConnect(CreateRequest, mapStateToProps)