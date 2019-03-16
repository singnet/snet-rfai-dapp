import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// Request Tabs Functionality
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// Custom Components
import ApproveToken from '../../components/ApproveToken'
import DepositToken from '../../components/DepositToken'
import WithdrawToken from '../../components/WithdrawToken'
import HelperFunctions from '../HelperFunctions'

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

class MyAccount extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts;
    this.helperFunctions = new HelperFunctions();

    this.state = {
      spenderAddress: this.contracts.ServiceRequest.address,
      dataKeyTokenBalance: null,
      tknBalance: 0,
      dataKeyTokenAllowance: null,
      tknAllowance: 0,
      dataKeyEscrowBalance: null,
      escrowBalance: 0,
      selectedTab: 0,
      dialogOpen: false,
      alertText: ''
    }
  }

  componentDidMount() {

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

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const selectedTab = this.state.selectedTab;

    const tknBalance = this.helperFunctions.fromWei(this.state.tknBalance)
    const escrowBalance = this.helperFunctions.fromWei(this.state.escrowBalance)
    const tknAllowance = this.helperFunctions.fromWei(this.state.tknAllowance)

    return (
      <div className="row account-page">

        <div className="your-account-details-container">
        <div className=" col-xs-12 col-sm-12 col-md-6 col-lg-6 your-account-details">
          <h4>Your Account Details</h4>

            <div className="row agent-detail">
              <div className=" col-xs-12 col-sm-4 col-md-5 col-lg-5">
                <label>Account ID</label>
              </div>
              {(typeof window.web3 !== 'undefined') ?
                <React.Fragment>
                  <div className=" col-xs-12 col-sm-8 col-md-7 col-lg-7 word-break">
                    <label>{this.props.accounts[0]}</label>
                  </div>
                </React.Fragment>
              : null}
            </div>

            <div className="row">
              <div className=" col-xs-12 col-sm-4 col-md-5 col-lg-5">
                <label>Token Balance</label>
              </div>
              <div className=" col-xs-12 col-sm-8 col-md-7 col-lg-7">
                <label>{tknBalance} AGI</label>
              </div>
            </div>

            <div className="row">
              <div className=" col-xs-12 col-sm-4 col-md-5 col-lg-5">
                <label>Escrow Balance</label>
              </div>
              <div className=" col-xs-12 col-sm-8 col-md-7 col-lg-7">
                <label>{escrowBalance} AGI</label>
              </div>
            </div>

            <div className="row">
              <div className=" col-xs-12 col-sm-4 col-md-5 col-lg-5">
                <label>Authorized Tokens</label>
              </div>
              <div className=" col-xs-12 col-sm-8 col-md-7 col-lg-7">
                <label>{tknAllowance} AGI</label>
              </div>
            </div>

          </div>
        </div>

        <div className="manage-escrow-acc-container">
        <div className=" col-xs-12 col-sm-12 col-md-6 col-lg-6 manage-escrow-acc">
          <h4>Manage Your RFAI Account</h4>
          <AppBar className="singularity-accordion-header" position="static" color="default">
            <Tabs className="singularity-accordion-tabs" value={selectedTab} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
              <Tab className="singularity-accordion-tab singularity-accordion-tab-allowance" label="Allowance" />
              <Tab className="singularity-accordion-tab singularity-accordion-tab-deposit" label="Deposit" />
              <Tab className="singularity-accordion-tab singularity-accordion-tab-withdraw" label="Withdraw" />
            </Tabs>
          </AppBar>          
          
          {selectedTab === 0 && <Typography component="div" ><ApproveToken /> </Typography>}
          {selectedTab === 1 && <Typography component="div" ><DepositToken /> </Typography>}
          {selectedTab === 2 && <Typography component="div" ><WithdrawToken /> </Typography>}
        </div>
      </div>

      </div>
    )
  }
}

MyAccount.contextTypes = {
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

export default drizzleConnect(MyAccount, mapStateToProps)