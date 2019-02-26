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

    this.state = {
      selectedTab: 0,
      dialogOpen: false,
      alertText: ''
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {

    const selectedTab = this.state.selectedTab;
    
    return ( 
      <div className="main-content">
      <div className="singularity-accordion"> {/*  className="main" Looks like this style has fixed width for the Tab Control...*/}
        <AppBar className="singularity-accordion-header" position="static" color="default">
          <Tabs className="singularity-accordion-tabs" value={selectedTab} onChange={this.handleChange}>
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