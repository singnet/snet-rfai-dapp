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
  requestId,
  requestDetails,
  requestSolutions,
  loading,
  metamaskDetails,
  startLoader,
  stopLoader,
}) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

  const handleCancel = () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
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
    // Based on StakeMember
    // Already Voted
    // Indicator of Foundation Vote

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
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING SOLUTIONS..</p>
                  </div>
                </div>
              )}
              {requestSolutions.length === 0 && (
                <div>
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
                      <TableRow key={sol.solution_submitter}>
                        <TableCell component="th" scope="row">
                          <span className={classes.mobileTableHeader}>Submitted by:</span>
                          {sol.solution_submitter} <br />
                          {sol.solution_submitter_name}
                        </TableCell>
                        <TableCell>
                          <span className={classes.mobileTableHeader}>Submitted on:</span>
                          {sol.created}
                        </TableCell>
                        <TableCell className={classes.solutionsURLData}>
                          <span className={classes.mobileTableHeader}>Solution URI:</span>
                          <a href={sol.solution_docURI} target="_new" className={classes.blueText}>
                            {sol.solution_docURI}
                          </a>
                        </TableCell>
                        <TableCell>
                          <span className={classes.mobileTableHeader}>Votes</span>
                          {sol.total_votes}
                        </TableCell>
                        <TableCell className={classes.voteBtn}>
                          <StyledButton
                            btnText="Vote"
                            disabled
                            type="transparentBlueBorder"
                            onClick={event => handleVoteSubmit(event, sol.solution_submitter)}
                          />
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
            <StyledButton btnText="Back the request" type="blue" onClick={handleCancel} />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

VoteSolution.defaultProps = {
  requestSolutions: [],
};

const mapStateToProps = (state, ownProps) => {
  const { requestId } = ownProps;

  return {
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
