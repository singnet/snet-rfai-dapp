import React, { useState } from "react";
import { connect } from "react-redux";
//import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";

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
import StyledButton from "../../../../common/StyledButton";

const RequestList = ({
  requestListData,
  loading,
  fetchRequestSolutionData,
  requestSolutions,
  fetchRequestStakeData,
  requestStakes,
  fetchRequestVoteData,
  requestVotes,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [selectedRequestTitle, setSelectedRequestTitle] = useState("");

  const modals = {
    SOLUTION: "SolutionList",
    VOTE: "VoteList",
    STAKE: "StakeList",
    APPROVEREJECT: "ApproveReject",
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
        await fetchRequestSolutionData(requestId);
        break;
      case modals.VOTE:
        await fetchRequestVoteData(requestId);
        break;
      case modals.STAKE:
        await fetchRequestStakeData(requestId);
        break;
      case modals.NONE:
      //DO NOTHING
    }
  };

  const handleCloseModel = () => {
    //setOpenModel(false);
    setOpenModel(modals.NONE);
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
  if (requestListData.length === 0) {
    return (
      <div>
        <span>No requests found.</span>
      </div>
    );
  }
  if (requestListData.length > 0) {
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
                  {r.total_fund} <span>AGI</span>
                </p>
              </div>
              <div className={classes.backersContainer}>
                <span className={classes.title}>Backers</span>
                <p className={classes.data}>
                  {r.num_stackers} <span>users</span>{" "}
                </p>
              </div>
              <div className={classes.solutionsContainer}>
                <span className={classes.title}>Solutions</span>
                <p className={classes.data}>{r.num_solutions} </p>
              </div>
              <div className={classes.votesContainer}>
                <span className={classes.title}>Votes</span>
                <p className={classes.data}> - </p>
              </div>
              <div className={classes.expiryContainer}>
                <span className={classes.title}>Expiry</span>
                <p className={classes.data}>29 Dec 2019 </p>
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
                  <span>project URL: </span>
                  <p className={classes.urlLink}>{r.document_uri} </p>
                </div>
                <div className={classes.exPanelTrainingDataset}>
                  <span>Training Dataset: </span>
                  <p className={classes.urlLink}>{r.training_data_set_uri} </p>
                </div>
              </div>
            </ExpansionPanelDetails>
            <Divider className={classes.divider} />
            {/* {this.createActionRow(req, index)} */}
            <ExpansionPanelActions className={classes.expansionPanelAction}>
              <div>
                <StyledButton
                  type="blue"
                  onClick={event => handleOpenModel(event, modals.SOLUTION, r.request_id, r.request_title)}
                  btnText="View Solution"
                />
                <StyledButton
                  type="blue"
                  onClick={event => handleOpenModel(event, modals.STAKE, r.request_id, r.request_title)}
                  btnText="View Backers"
                />
                <StyledButton
                  type="blue"
                  onClick={event => handleOpenModel(event, modals.VOTE, r.request_id, r.request_title)}
                  btnText="View Votes"
                />
                <StyledButton
                  type="blue"
                  onClick={event => handleOpenModel(event, modals.APPROVEREJECT, r.request_id)}
                  btnText="Approve/Reject"
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
          open={openModel === modals.APPROVEREJECT ? true : false}
          handleClose={handleCloseModel}
          requestId={selectedRequestId}
          actionType="Approve"
        />
      </div>
    );
  }

  return <div />;
};

RequestList.defaultProps = {
  requestListData: [],
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.RequestCallStatus,
  requestSolutions: state.requestReducer.requestSolutions,
  requestStakes: state.requestReducer.requestStakes,
  requestVotes: state.requestReducer.requestVotes,
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
