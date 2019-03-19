import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import web3 from 'web3'
import PropTypes from 'prop-types'

// Request Tabs Functionality
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'

// Custom Components
import HelperFunctions from '../HelperFunctions'

//inline styles
const styles = {
  backgroundColor: 'white',
  padding: 20
}

const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const BN = web3.utils.BN

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class StakeRequest extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts;
    this.helperFunctions = new HelperFunctions();

    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleStakeButton = this.handleStakeButton.bind(this)

    this.state = {
      requestId: this.props.requestId,
      dataKeyEscrowBalance: null,
      escrowBalance: 0,
      stakeAmount: 0,
      dataKeyMinStake: null,
      dataKeyMaxStakers: null,
      dataKeyNextRequestId: null,
      dataKeyOwner: null,
      dataKeyRequestKey: null,
      minStake: null,
      maxStakers: null,
      selectedTab: 0,
      dialogOpen: false,
      alertText: ''
    }

  }

  componentDidMount() {
    const dataKeyEscrowBalance = this.contracts.ServiceRequest.methods.balances.cacheCall(this.props.accounts[0]);
    this.setState({dataKeyEscrowBalance})
    this.setEscrowBalance(this.props.ServiceRequest)

    const dataKeyMinStake = this.contracts.ServiceRequest.methods.minStake.cacheCall();
    this.setState({dataKeyMinStake})

    const dataKeyMaxStakers = this.contracts.ServiceRequest.methods.maxStakers.cacheCall();
    this.setState({dataKeyMaxStakers})

    const dataKeyOwner  = this.contracts.ServiceRequest.methods.owner.cacheCall();
    this.setState({dataKeyOwner})
    this.setContractConfigurations(this.props.ServiceRequest)

    const dataKeyRequestKey = this.contracts.ServiceRequest.methods.getServiceRequestById.cacheCall(this.state.requestId)
    this.setState({dataKeyRequestKey})

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyEscrowBalance !== prevState.dataKeyEscrowBalance) {
      this.setEscrowBalance(this.props.ServiceRequest)
    }

    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyMinStake !== prevState.dataKeyMinStake) {
      this.setContractConfigurations(this.props.ServiceRequest)
    }

  }

  setEscrowBalance(contract) {
    if (contract.balances[this.state.dataKeyEscrowBalance] !== undefined && this.state.dataKeyEscrowBalance !== null) {
      this.setState({
        escrowBalance: contract.balances[this.state.dataKeyEscrowBalance].value
      })
    }
  }

  setContractConfigurations(contract) {

    if (contract.minStake[this.state.dataKeyMinStake] !== undefined && this.state.dataKeyMinStake !== null) {
      this.setState({
        minStake: contract.minStake[this.state.dataKeyMinStake].value
      })
    }

    if (contract.maxStakers[this.state.dataKeyMaxStakers] !== undefined && this.state.dataKeyMaxStakers !== null) {
      this.setState({
        maxStakers: contract.maxStakers[this.state.dataKeyMaxStakers].value
      })
    }

    if (contract.owner[this.state.dataKeyOwner] !== undefined && this.state.dataKeyOwner !== null) {
      this.setState({
        owner: contract.owner[this.state.dataKeyOwner].value
      })
    }
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

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

  handleStakeButton() {
    var zeroBN = new BN(0)
    var stakeAmountBN = new BN(this.helperFunctions.toWei(this.state.stakeAmount))
    var minStakeBN = new BN(this.state.minStake)
    var escrowBalanceBN = new BN(this.state.escrowBalance)

    if(stakeAmountBN.gt(zeroBN) && stakeAmountBN.lte(escrowBalanceBN) && stakeAmountBN.gte(minStakeBN)) {
      this.contracts.ServiceRequest.methods["addFundsToRequest"].cacheSend(this.state.requestId, stakeAmountBN.toString(), {from: this.props.accounts[0]})
    } else if (stakeAmountBN.gt(escrowBalanceBN)) {
      this.setState({ alertText: 'Oops! You are trying to transfer more than you have in Escrow.'})
      this.handleDialogOpen()
    } else if(stakeAmountBN.lt(minStakeBN)) {
      const errText = 'Oops! You need to have min stake - ' + this.state.minStake + ' .'
      this.setState({ alertText: errText })
      this.handleDialogOpen()
    }else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  render() {
    const escrowBalance = this.helperFunctions.fromWei(this.state.escrowBalance)

    if(this.state.dataKeyRequestKey !== null && this.props.ServiceRequest.getServiceRequestById[this.state.dataKeyRequestKey] !== undefined) {
      var r = this.props.ServiceRequest.getServiceRequestById[this.state.dataKeyRequestKey].value;
      return (
        <div > 
          <Paper style={styles} elevation={0} className="singularity-content fund-this-project">
            <form className="pure-form pure-form-stacked">
  
              <div className="row fund-project-sub-header">
                <div className="col-md-12">
                  <span className="bold">Digit Recognizer</span>
                </div>
              </div>
  
              <div className="row requester-detail">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <span className="bold">requested by:</span>
                  <span>{this.helperFunctions.toShortAddress(r.requester)}</span>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <span className="bold">current amount</span>
                  <span>{this.helperFunctions.fromWei(r.totalFund)} AGI</span>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <span className="bold">backers</span>
                  <span>{r.stakeMembers.length}</span>
                </div>
              </div>
  
              <div className="row balance-funding-amt-div">
                <div className="col-md-12">
                  { /*<i className="fa fa-info-circle" aria-hidden="true"></i> */ }
                  <div className="balance-div">
                    <span>Your Balance in Escrow</span>
                    <span>{escrowBalance} AGI</span>
                  </div>
                  <div className="funding-amt-div">
                    <span>Funding Amount</span>
                    <span><input className="singularity-input" name="stakeAmount" type="text" autoComplete='off' placeholder="Tokens to fund" value={this.state.stakeAmount} onChange={this.handleAmountInputChange} /></span>
                  </div>
                </div>
              </div>
  
              {/* <div className="row">
                <div className="col-md-12">
                  <p className="error-txt">error state message</p>
                </div>
              </div> */}
  
              <div className="row">
                <div className="col-md-12 buttons">
                  {/* <button className="cncl-btn">cancel</button> */}
                  <Button className="blue fund-project" type="Button" variant="contained" onClick={this.handleStakeButton}>fund project</Button>
                </div>
              </div>
  
            </form>
          </Paper>
  
          <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
            <p>{this.state.alertText}</p>
            <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
          </Dialog>
  
        </div>
      )
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
    

    
  }
}

StakeRequest.contextTypes = {
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

export default drizzleConnect(StakeRequest, mapStateToProps)
