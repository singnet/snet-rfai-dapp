import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

import AlertBox, { alertTypes } from "../../../../common/AlertBox";
import { requestDetailsById } from "../../../../../Redux/reducers/RequestReducer";
import { waitForTransaction, voteForSolution } from "../../../../../utility/BlockchainHelper";

// Table dependencies
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { loaderActions } from "../../../../../Redux/actionCreators";

const VoteSolution = ({
  open,
  handleClose,
  showBackRequest,
  requestId,
  requestDetails,
  requestSolutions,
  requestVotes,
  selectedTab,
  loading,
  metamaskDetails,
  startLoader,
  stopLoader,
  isLoggedIn,
}) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });
  const actionToDisable = !(metamaskDetails.isTxnsAllowed && isLoggedIn);

  const handleCancel = () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
  };

  const isUserAlreadyVotedForSolution = submitter => {
    let isVoted = false;
    if (metamaskDetails.isTxnsAllowed && Object.entries(requestVotes).length > 0) {
      const vots = requestVotes.filter(
        vot =>
          vot.voter.toLowerCase() === metamaskDetails.account.toLowerCase() && vot.submitter.toLowerCase() === submitter
      );
      if (vots.length > 0) isVoted = true;
    }
    return isVoted;
  };

  const handleVoteSubmit = async (event, solutionSubmitter) => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    try {
      // Initiate the Deposit Token to RFAI Escrow
      let txHash = await voteForSolution(metamaskDetails, requestId, solutionSubmitter);

      startLoader(LoaderContent.VOTE_REQUEST);

      // Wait for the transaction to be completed
      await waitForTransaction(txHash);

      setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

      stopLoader();
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      stopLoader();
    }
  };

  if (!requestDetails) {
    return <div />;
  }
  return (
    // TODO: Need to contorl the disability of the Vote Button
    // Based on StakeMember & metamask Connection
    // Indicator of Foundation Vote -- Looks like not required based on UI Design

    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={"Vote Solutions"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              <div className={classes.requestTitleContainer}>
                <span className={classes.requestTitle}>Request Title : </span>
                <span className={classes.titleName}>{requestDetails.request_title}</span>
              </div>
              <div className={classes.voteSolutionDescription}>
                <p>
                  All users must back the request with AGI tokens in order to gain voting privileges. Backer’s votes
                  define which solutions will be alloted their backed AGI tokens. Backers that vote for multiple
                  solutions will have their back AGI tokens split evening on the voted solutions. Backers who do not
                  vote will have SingularityNet foundation vote determine their backed AGI distribution.{" "}
                </p>
              </div>
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING SOLUTIONS..</p>
                  </div>
                </div>
              )}
              {requestSolutions.length === 0 && (
                <div className={classes.noDataFound}>
                  <span>No solutions found.</span>
                </div>
              )}
              {!loading && requestSolutions.length > 0 && (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Submitted by</TableCell>
                      <TableCell>Submitted on</TableCell>
                      <TableCell>Solution URI</TableCell>
                      <TableCell>Votes</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestSolutions.map(sol => (
                      <TableRow key={sol.submitter}>
                        <TableCell component="th" scope="row">
                          <span className={classes.mobileTableHeader}>Submitted by:</span>
                          {sol.submitter} <br />
                          {/* {sol.solution_submitter_name} */}
                        </TableCell>
                        <TableCell>
                          <span className={classes.mobileTableHeader}>Submitted on:</span>
                          {sol.created_at}
                        </TableCell>
                        <TableCell className={classes.solutionsURLData}>
                          <span className={classes.mobileTableHeader}>Solution URI:</span>
                          <a href={sol.solution_docURI} target="_new" className={classes.blueText}>
                            {sol.doc_uri}
                          </a>
                        </TableCell>
                        <TableCell>
                          <span className={classes.mobileTableHeader}>Votes</span>
                          {sol.total_votes}
                        </TableCell>
                        <TableCell className={classes.voteBtn}>
                          {isUserAlreadyVotedForSolution(sol.submitter) ? (
                            <span>Voted</span>
                          ) : (
                            <StyledButton
                              btnText="Vote"
                              type="transparentBlueBorder"
                              onClick={event => handleVoteSubmit(event, sol.submitter)}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Close" type="transparent" onClick={handleCancel} />
            {(selectedTab === 1 || selectedTab === 2) && (
              <StyledButton btnText="Back request" type="blue" onClick={showBackRequest} disabled={actionToDisable} />
            )}
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

VoteSolution.defaultProps = {
  requestSolutions: [],
  requestVotes: [],
};

const mapStateToProps = (state, ownProps) => {
  const { requestId } = ownProps;

  return {
    isLoggedIn: state.userReducer.login.isLoggedIn,
    loading: state.loaderReducer.RequestModalCallStatus,
    metamaskDetails: state.metamaskReducer.metamaskDetails,
    requestDetails: requestDetailsById(state, requestId),
  };
};

const mapDispatchToProps = dispatch => ({
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteSolution);
