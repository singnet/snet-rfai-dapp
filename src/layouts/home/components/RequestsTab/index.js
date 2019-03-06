import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// Request Tabs Functionality
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// Custom Components
import RequestListV2 from '../../components/RequestListV2'

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

class RequestsTab extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts;

    this.state = {
      dataKeyMemberKeys: null,
      foundationMembers: [],
      dataKeyOwner: null,
      owner: null,
      selectedTab: 1,
      dialogOpen: false,
      isFoundationMember: false,
      alertText: ''
    }
  }

  componentDidMount() {
    const dataKeyMemberKeys = this.contracts.ServiceRequest.methods.getFoundationMemberKeys.cacheCall();
    this.setState({dataKeyMemberKeys})
    this.setFoundationMembers(this.props.ServiceRequest)
    const dataKeyOwner  = this.contracts.ServiceRequest.methods.owner.cacheCall();
    this.setState({dataKeyOwner})
    this.setOwner(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyMemberKeys !== prevState.dataKeyMemberKeys) {
        this.setFoundationMembers(this.props.ServiceRequest)
    }
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyOwner !== prevState.dataKeyOwner) {
      this.setOwner(this.props.ServiceRequest)
    }
  }

  setFoundationMembers(contract) {
    if (contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys] !== undefined && this.state.dataKeyMemberKeys !== null) {
      this.setState({
        foundationMembers: contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys].value
      }, () => {
        const exists = this.state.foundationMembers.some(m => m === this.props.accounts[0])
        if(exists) {
          this.setState({isFoundationMember : exists});
          //if(this.state.selectedTab !== 0) this.setState ({selectedTab : 0})  
        }          
      });
    }
  }

  setOwner(contract) {
    if (contract.owner[this.state.dataKeyOwner] !== undefined && this.state.dataKeyOwner !== null) {
      this.setState({
        owner: contract.owner[this.state.dataKeyOwner].value
      }, () => {
        if( this.state.owner === this.props.accounts[0]) {
          this.setState({isFoundationMember : true});
          //if(this.state.selectedTab !== 0) this.setState ({selectedTab : 0})
        }          
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
    console.log("selectedTab - " + value);
  };

  render() {
    const selectedTab = this.state.selectedTab;
    return (
      <div className="main-content view-request">

        <div className="getting-started-your-balance">
          <div className="row">
            <div className="getting-started">
              <div className="getting-started-div">
                <span>Getting Started</span>                
              </div>
              <div className="getting-started-text">
                <p>Welcome AI Developers. With this community portal, you can make projects requests for AI services that you think the others will want to use. In addition you can fund projects, view solutions, and submit solutions to claim AGI token rewards.</p>
                <div className="documentation-btn">
                  <button>documentation</button>
                </div>
              </div>
            </div>
            <div className="your-balance">
              <div className="your-balance-div">
                <span>Your Balance In Escrow</span>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </div>
              <div className="your-balance-data">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
                <span className="balance">0.0000456 AGI</span>
                <div className="add-more-funds-btn">
                  <button>add more funds</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="network-name">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          <span>Current Network: </span>
          <span>Kovan Test Network</span>
        </div>

        <div className="main singularity-accordion-main">
          <p className="view-req-header">Requests for AI Services</p>
          <AppBar position="static" color="default" className="singularity-tabs">
            <Tabs value={selectedTab} onChange={this.handleChange} >
              {this.state.isFoundationMember === true && <Tab label="Open " className="singularity-tab" value={0}/> }
              <Tab className="singularity-tab" label="Approved " value={1}/>
              <Tab className="singularity-tab" label="Rejected " value={2} />
              <Tab className="singularity-tab" label="Closed " value={3} />
              <Tab className="singularity-tab" label="Expired " value={4} />
            </Tabs>
          </AppBar>
          {selectedTab === 0 && this.state.isFoundationMember === true && <Typography component="div" ><RequestListV2  compRequestStatus="0"/> </Typography>}        
          {selectedTab === 1 && <Typography component="div" ><RequestListV2  compRequestStatus="1"/> </Typography>}
          {selectedTab === 2 && <Typography component="div" ><RequestListV2  compRequestStatus="2"/> </Typography>}
          {selectedTab === 3 && <Typography component="div" ><RequestListV2  compRequestStatus="4"/> </Typography>}
          {selectedTab === 4 && <Typography component="div" ><RequestListV2  compRequestStatus="999"/> </Typography>}
        </div>

      </div>
    )
  }
}

RequestsTab.contextTypes = {
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

export default drizzleConnect(RequestsTab, mapStateToProps)
