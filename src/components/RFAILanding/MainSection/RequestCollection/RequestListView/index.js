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
            <ExpansionPanelSummary className="expansion-panel-summary" expandIcon={<ExpandMoreIcon />}>
              <div>{r.request_title} </div>
              <div>
                <span>
                  <b>Tokens Awarded:</b>
                </span>
                <br />
                <span>{r.total_fund} </span>
              </div>
              <div>
                <span>
                  <b>Backers</b>
                </span>
                <br />
                <span>{r.num_stackers} </span>
              </div>
              <div>
                <span>
                  <b>Solutions</b>
                </span>
                <br />
                <span>{r.num_solutions} </span>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <p>Description: {r.description} </p>
                <p>Acceptance Criteria: {r.acceptance_criteria} </p>
                <p>Submission Deadline: {r.end_submission} </p>
                <p>project URL: {r.document_uri} </p>
                <p>Training Dataset: {r.training_data_set_uri} </p>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            {/* {this.createActionRow(req, index)} */}
            <ExpansionPanelActions className="expansion-panel-actions">
              <div>
                <button onClick={event => handleOpenModel(event, modals.SOLUTION, r.request_id, r.request_title)}>
                  View Solution
                </button>
                <button onClick={event => handleOpenModel(event, modals.STAKE, r.request_id, r.request_title)}>
                  View Backers
                </button>
                <button onClick={event => handleOpenModel(event, modals.VOTE, r.request_id, r.request_title)}>
                  View Votes
                </button>
                <button onClick={event => handleOpenModel(event, modals.APPROVEREJECT, r.request_id)}>
                  Approve/Reject
                </button>
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
