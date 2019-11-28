import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

// Request Tabs Functionality
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useStyles } from "./styles";
import RequestListView from "../RequestListView";
import { requestActions } from "../../../../../Redux/actionCreators";
import StyledDropdown from "../../../../common/StyledDropdown";

const requestStatusMap = {
  "0": "PENDING",
  "1": "ACTIVE",
  "2": "SOLUTION_VOTE",
  "3": "COMPLETED",
  "4": "INCOMPLETE",
  "5": "CLOSED",
};

class RequestTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 1,
      myRequestsFlag: false,
      tabsName: [{ label: "Completed" }, { label: "Expired" }, { label: "My Requests" }],
    };
  }

  componentDidMount = async () => {
    await this.updateRequestData();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { metamaskDetails } = this.props;
    if (prevProps.metamaskDetails.account !== metamaskDetails.account) {
      await this.updateRequestData();
    }
  };

  updateRequestData = async () => {
    const { fetchRequestSummaryData, fetchRequestData, metamaskDetails } = this.props;
    // Need to set this value as per the Default Tab - Active
    const requestStatus = requestStatusMap[this.state.selectedTab];
    const isMyRequests = this.state.myRequestsFlag;
    await fetchRequestSummaryData(metamaskDetails, isMyRequests);
    await fetchRequestData(requestStatus, metamaskDetails, isMyRequests);
  };

  // Tab Change
  handleTabChange = async (event, value) => {
    const { fetchRequestSummaryData, fetchRequestData, metamaskDetails } = this.props;
    this.setState({ selectedTab: value });
    const requestStatus = requestStatusMap[value];

    await fetchRequestSummaryData(metamaskDetails, this.state.myRequestsFlag);
    await fetchRequestData(requestStatus, metamaskDetails, this.state.myRequestsFlag);
  };

  handleMyRequestChange = async () => {
    const { fetchRequestSummaryData, fetchRequestData, metamaskDetails } = this.props;

    const myRequestsFlag = !this.state.myRequestsFlag;
    this.setState({ myRequestsFlag });

    const requestStatus = requestStatusMap[this.state.selectedTab];

    // Call the Dispatch to Reload the databased on the Selected Tab
    await fetchRequestSummaryData(metamaskDetails, myRequestsFlag);
    await fetchRequestData(requestStatus, metamaskDetails, myRequestsFlag);
  };

  render() {
    const { foundationMembers, metamaskDetails, requestDetails, requestSummary, classes } = this.props;
    const { selectedTab, tabsName } = this.state;

    // eslint-disable-next-line no-unused-vars
    var isFoundationMember = false;

    if (metamaskDetails.isTxnsAllowed && Object.entries(foundationMembers).length > 0) {
      const mems = foundationMembers.filter(
        mem => mem.member_address.toLowerCase() === metamaskDetails.account.toLowerCase() && mem.active
      );
      if (mems.length > 0) isFoundationMember = true;
    }

    return (
      <Grid container spacing={24} className={classes.requestTabMainContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <AppBar position="static" color="default" className={classes.header}>
            <Tabs value={selectedTab} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
              {/* {this.state.isFoundationMember === true && <Tab className="singularity-tab" label="Pending" value={0}/> } */}
              <Tab className="singularity-tab" label={"Active(" + requestSummary.Active + ")"} value={1} />
              <Tab className="singularity-tab" label="Evaluation" value={2} />
              <Tab className="singularity-tab" label={"Completed(" + requestSummary.Completed + ")"} value={3} />
              {/* {this.state.isFoundationMember === true && <Tab className="singularity-tab" label="Rejected" value={4}/> } */}
              <Tab className="singularity-tab" label={"Expired(" + requestSummary.Expired + ")"} value={5} />
              <Tab className="singularity-tab" label="My Requests" value={6} />
              <div className={classes.showMoreContaienr}>
                <StyledDropdown inputLabel="More" list={tabsName} onChange={this.handleChange} />
              </div>
            </Tabs>

            <div className={classes.checkboxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.myRequestsFlag}
                    onChange={this.handleMyRequestChange}
                    color="primary"
                    disabled={metamaskDetails.isTxnsAllowed ? false : true}
                  />
                }
                label="Show my requests only"
              />
            </div>
          </AppBar>

          {selectedTab === 0 && (
            <Typography component="div" className={classes.requestTabDetailContainer}>
              <RequestListView requestListData={requestDetails} loading={true} selectedTab={selectedTab} />
            </Typography>
          )}
          {selectedTab === 1 && (
            <Typography component="div" className={classes.requestTabDetailContainer}>
              <RequestListView requestListData={requestDetails} loading={true} selectedTab={selectedTab} />
            </Typography>
          )}
          {selectedTab === 2 && (
            <Typography component="div" className={classes.requestTabDetailContainer}>
              <RequestListView requestListData={requestDetails} selectedTab={selectedTab} />
            </Typography>
          )}
          {selectedTab === 3 && (
            <Typography component="div" className={classes.requestTabDetailContainer}>
              <RequestListView requestListData={requestDetails} selectedTab={selectedTab} />
            </Typography>
          )}
          {selectedTab === 4 && (
            <Typography component="div" className={classes.requestTabDetailContainer}>
              <RequestListView requestListData={requestDetails} selectedTab={selectedTab} />
            </Typography>
          )}
          {selectedTab === 5 && (
            <Typography component="div" className={classes.requestTabDetailContainer}>
              <RequestListView requestListData={requestDetails} selectedTab={selectedTab} />
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  requestDetails: state.requestReducer.requestDetails,
  foundationMembers: state.requestReducer.foundationMembers,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchRequestSummaryData: (metamaskDetails, isMyRequests) =>
    dispatch(requestActions.fetchRequestSummaryData(metamaskDetails, isMyRequests)),
  fetchRequestData: (requestStatus, metamaskDetails, isMyRequests) =>
    dispatch(requestActions.fetchRequestData(requestStatus, metamaskDetails, isMyRequests)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(RequestTab));
