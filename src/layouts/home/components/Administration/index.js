import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// Request Tabs Functionality
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// Custom Components
import CreateMember from '../../components/CreateMember'
import ContractConfig from '../../components/ContractConfig'

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

class Administration extends Component {

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
      <div className="singularity-accordion" > {/*  className="main" Looks like this style has fixed width for the Tab Control...*/}
        <AppBar className="singularity-accordion-header" position="static" color="default">
          <Tabs className="singularity-accordion-tabs" value={selectedTab} onChange={this.handleChange}>
            <Tab className="singularity-accordion-tab" label="Configurations" />
            <Tab className="singularity-accordion-tab" label="Foundation Member" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && <Typography component="div" ><ContractConfig /> </Typography>}
        {selectedTab === 1 && <Typography component="div" ><CreateMember /> </Typography>}
        
      </div>

      </div>
    )
  }
}

Administration.contextTypes = {
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

export default drizzleConnect(Administration, mapStateToProps)