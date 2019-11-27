import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
//import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";
import LaunchIcon from "@material-ui/icons/Launch";
// Request List View Functionality
import { requestActions } from "../../../../../Redux/actionCreators";

// Exapandable pannels
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

// Dependent Components
import SolutionList from "../SolutionList";
import StakeList from "../StakeList";
import VoteList from "../VoteList";
import ApproveRejectRequest from "../ApproveRejectRequest";
import StakeRequest from "../StakeRequest";
import SubmitSolution from "../SubmitSolution";
import CloseRequest from "../CloseRequest";
import VoteSolution from "../VoteSolution";

import { fromWei, computeDateFromBlockNumber, isFoundationMember } from "../../../../../utility/GenHelperFunctions";
import { getBlockNumber, claimBackRequest, claimRequest } from "../../../../../utility/BlockchainHelper";

import StyledButton from "../../../../common/StyledButton";

const RequestList = ({
  requestListData,
  loading,
  selectedTab,
  fetchRequestSolutionData,
  requestSolutions,
  fetchRequestStakeData,
  requestStakes,
  fetchRequestVoteData,
  requestVotes,
  metamaskDetails,
  foundationMembers,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [selectedRequestTitle, setSelectedRequestTitle] = useState("");
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the BlockNumber
    setBlockNumber();
  });

  // TODO: Need to check why we are getting Block NUmber in Reject
  const setBlockNumber = async () => {
    try {
      let blockNumber = await getBlockNumber();
      setCurrentBlockNumber(blockNumber);
    } catch (err) {
      setCurrentBlockNumber(err);
    }
  };

  const modals = {
    SOLUTION: "SolutionList",
    VOTE: "VoteList",
    STAKE: "StakeList",
    APPROVEREQUEST: "ApproveRequest",
    REJECTREQUEST: "RejectRequest",
    STAKEREQUEST: "StakeRequest",
    SUBMITSOLUTION: "SubmitSolution",
    CLOSEREQUEST: "CloseRequest",
    VOTESOLUTION: "VoteSolution",
    NONE: "None",
  };

  const classes = useStyles();

  // Event Functions
  const handleChange = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const handleOpenModel = async (event, modal, requestId, requestTitle) => {
    //setOpenModel(true);
    setOpenModel(modal);
    setSelectedRequestId(requestId);
    setSelectedRequestTitle(requestTitle);

    // To Initiate the respective API Calls
    switch (modal) {
      case modals.SOLUTION:
      case modals.VOTESOLUTION:
        await fetchRequestSolutionData(requestId);
        break;
      case modals.VOTE:
        await fetchRequestVoteData(requestId);
        break;
      case modals.STAKE:
        await fetchRequestStakeData(requestId);
        break;
      default:
      //DO NOTHING
    }
  };

  const handleCloseModel = () => {
    //setOpenModel(false);
    setOpenModel(modals.NONE);
  };

  // TODO: To be Deleted
  const handleClaimBack = (event, modal, requestId) => {
    claimBackRequest(metamaskDetails, requestId);
  };
  // TODO: To be Deleted
  const handleClaim = (event, modal, requestId) => {
    claimRequest(metamaskDetails, requestId);
  };

  // Render HTML
  if (loading) {
    return (
      <div className={classes.circularProgressContainer}>
        <div className={classes.loaderChild}>
          <CircularProgress className={classes.circularProgress} />
          <p className={classes.loaderText}>LOADING REQUESTS..</p>
        </div>
      </div>
    );
  }
  if (!requestListData.length || requestListData.length === 0) {
    return (
      <div>
        <span>No requests found.</span>
      </div>
    );
  }
  if (requestListData.length > 0) {
    const bIsFoundationMember = isFoundationMember(metamaskDetails, foundationMembers);
    //const bDisableAction = !metamaskDetails.isTxnsAllowed;
    return (
      <div>
        {requestListData.map(r => (
          <ExpansionPanel
            className="expansion-panel"
            key={r.request_id}
            expanded={expanded === r.request_id}
            onChange={handleChange(r.request_id)}
          >
            <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
              <div className={classes.serviceProviderRequestByContainer}>
                <p className={classes.serviceProviderName}>{r.request_title} </p>
              </div>
              <div className={classes.tokenAwardedContainer}>
                <span className={classes.title}>Tokens Awarded:</span>
                <p className={classes.data}>
                  {r.fund_total > 0 ? fromWei(r.fund_total) : 0} <span>AGI</span>
                </p>
              </div>
              <div className={classes.backersContainer}>
                <span className={classes.title}>Backers</span>
                <p className={classes.data}>
                  {r.stake_count} <span>users</span>{" "}
                </p>
              </div>
              <div className={classes.solutionsContainer}>
                <span className={classes.title}>Solutions</span>
                <p className={classes.data}>{r.solution_count} </p>
              </div>
              <div className={classes.votesContainer}>
                <span className={classes.title}>Votes</span>
                <p className={classes.data}> {r.vote_count} </p>
              </div>
              <div className={classes.expiryContainer}>
                <span className={classes.title}>Expiry</span>
                <p className={classes.data}>{computeDateFromBlockNumber(currentBlockNumber, r.expiration)} </p>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <div className={classes.exPanelLeftSection}>
                <div className={classes.exPanelDescription}>
                  <span>Description: </span>
                  <p>{r.description} </p>
                </div>
                <div className={classes.exPanelAcceptanceCriteria}>
                  <span>Acceptance Criteria: </span>
                  <p>{r.acceptance_criteria} </p>
                </div>
              </div>
              <div className={classes.exPanelRightSection}>
                <div className={classes.exPanelSubDeadline}>
                  <span>Submission Deadline: </span>
                  <p>{r.end_submission} </p>
                </div>
                <div className={classes.exPanelProjURL}>
                  <span>Project URL: </span>

                  <p className={classes.urlLink}>
                    <LaunchIcon />
                    <a href={r.git_hub_link} target="_new">
                      {r.git_hub_link}
                    </a>{" "}
                  </p>
                </div>
                <div className={classes.exPanelTrainingDataset}>
                  <span>Training Dataset: </span>
                  <p className={classes.urlLink}>
                    <LaunchIcon />
                    <a href={r.training_data_set_uri} target="_new">
                      {r.training_data_set_uri}
                    </a>
                  </p>
                </div>
              </div>
            </ExpansionPanelDetails>
            <Divider className={classes.divider} />
            {/* {this.createActionRow(req, index)} */}
            <ExpansionPanelActions className={classes.expansionPanelAction}>
              <div>
                {selectedTab === 0 && bIsFoundationMember === true && (
                  <Fragment>
                    <StyledButton
                      type="blue"
                      onClick={event => handleOpenModel(event, modals.APPROVEREQUEST, r.request_id)}
                      btnText="Approve Request"
                    />
                    <StyledButton
                      type="red"
                      onClick={event => handleOpenModel(event, modals.REJECTREQUEST, r.request_id)}
                      btnText="Reject Request"
                    />
                  </Fragment>
                )}

                {(selectedTab === 1 || selectedTab === 2) && (
                  <Fragment>
                    <StyledButton
                      type="blue"
                      onClick={event => handleOpenModel(event, modals.STAKEREQUEST, r.request_id)}
                      btnText="Back Request"
                    />
                  </Fragment>
                )}
                {(selectedTab === 2 || selectedTab === 3) && (
                  <Fragment>
                    <StyledButton
                      type="blue"
                      onClick={event => handleOpenModel(event, modals.SOLUTION, r.request_id)}
                      btnText="View Solutions"
                    />
                  </Fragment>
                )}

                {selectedTab === 1 && (
                  <Fragment>
                    <StyledButton
                      type="blue"
                      onClick={event => handleOpenModel(event, modals.SUBMITSOLUTION, r.request_id)}
                      btnText="Submit Solution"
                    />
                  </Fragment>
                )}

                {selectedTab === 2 && (
                  <Fragment>
                    <StyledButton
                      type="blue"
                      onClick={event => handleOpenModel(event, modals.VOTESOLUTION, r.request_id)}
                      btnText="Vote Solutions"
                    />
                  </Fragment>
                )}

                {(selectedTab === 0 || ((selectedTab === 1 || selectedTab === 2) && bIsFoundationMember === true)) && (
                  <Fragment>
                    <StyledButton
                      type="red"
                      onClick={event => handleOpenModel(event, modals.CLOSEREQUEST, r.request_id)}
                      btnText="Close Request"
                    />
                  </Fragment>
                )}

                {/** Following Buttons to be deleted */}
                <StyledButton
                  type="blue"
                  onClick={event => handleOpenModel(event, modals.STAKE, r.request_id)}
                  btnText="View Backers"
                />
                <StyledButton
                  type="blue"
                  onClick={event => handleOpenModel(event, modals.VOTE, r.request_id, r.request_title)}
                  btnText="View Votes"
                />
                <StyledButton
                  type="blue"
                  onClick={event => handleClaimBack(event, modals.NONE, r.request_id)}
                  btnText="Claim Back"
                />
                <StyledButton
                  type="blue"
                  onClick={event => handleClaim(event, modals.NONE, r.request_id)}
                  btnText="Claim"
                />
              </div>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}

        <SolutionList
          open={openModel === modals.SOLUTION ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          requestTitle={selectedRequestTitle}
          requestSolutions={requestSolutions}
        />
        <StakeList
          open={openModel === modals.STAKE ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          requestTitle={selectedRequestTitle}
          requestStakes={requestStakes}
        />
        <VoteList
          open={openModel === modals.VOTE ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          requestTitle={selectedRequestTitle}
          requestVotes={requestVotes}
        />
        <ApproveRejectRequest
          open={openModel === modals.APPROVEREQUEST || openModel === modals.REJECTREQUEST ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          actionType={openModel === modals.APPROVEREQUEST ? "Approve" : "Reject"}
        />
        <ApproveRejectRequest
          open={openModel === modals.REJECTREQUEST ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          actionType="Reject"
        />
        <StakeRequest
          open={openModel === modals.STAKEREQUEST ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
        />
        <SubmitSolution
          open={openModel === modals.SUBMITSOLUTION ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
        />
        <CloseRequest
          open={openModel === modals.CLOSEREQUEST ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
        />
        <VoteSolution
          open={openModel === modals.VOTESOLUTION ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          requestSolutions={requestSolutions}
        />
      </div>
    );
  }

  return <div />;
};

RequestList.defaultProps = {
  requestListData: [],
  foundationMembers: [],
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.RequestCallStatus,
  requestSolutions: state.requestReducer.requestSolutions,
  requestStakes: state.requestReducer.requestStakes,
  requestVotes: state.requestReducer.requestVotes,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  foundationMembers: state.requestReducer.foundationMembers,
});

const mapDispatchToProps = dispatch => ({
  fetchRequestSolutionData: requestId => dispatch(requestActions.fetchRequestSolutionData(requestId)),
  fetchRequestStakeData: requestId => dispatch(requestActions.fetchRequestStakeData(requestId)),
  fetchRequestVoteData: requestId => dispatch(requestActions.fetchRequestVoteData(requestId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);
