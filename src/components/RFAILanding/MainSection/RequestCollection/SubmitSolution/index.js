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
import { submitSolutionForRequest } from "../../../../../utility/BlockchainHelper";

import web3 from "web3";

import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { loaderActions } from "../../../../../Redux/actionCreators";

import snetValidator from "../../../../../utility/snetValidator";

const SubmitSolution = ({
  open,
  handleClose,
  requestId,
  requestDetails,
  loading,
  metamaskDetails,
  startLoader,
  stopLoader,
  isLoggedIn,
}) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });
  const [solURI, setSolURI] = useState("");

  const actionToDisable = !(metamaskDetails.isTxnsAllowed && isLoggedIn);

  const handleCancel = () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
  };

  const handleSubmit = async () => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    const isValidSolURI = snetValidator({ solURI }, { solURI: { url: true } });

    if (solURI.trim().length > 0 && !isValidSolURI) {
      try {
        // Reset the Error Message
        setAlert({ type: alertTypes.ERROR, message: undefined });

        const docURIinBytes = web3.utils.fromAscii(solURI);

        startLoader(LoaderContent.SOLUTION_REQUEST);

        // Initiate the Deposit Token to RFAI Escrow
        await submitSolutionForRequest(metamaskDetails, requestId, docURIinBytes);

        setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

        stopLoader();
      } catch (err) {
        setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
        stopLoader();
      }
    } else {
      setAlert({ type: alertTypes.ERROR, message: `Invalid solution URL.` });
    }
  };

  if (!requestDetails) {
    return <div />;
  }

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={"Submit Solution"}
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
                    <p className={classes.loaderText}>LOADING SOLUTION..</p>
                  </div>
                </div>
              )}
              {!loading && (
                <div className={classes.submitSolutionContent}>
                  <div className="overview-content">
                    <p>
                      All submissions are evaluated by the SingularityNet foundation to ensure that the acceptance
                      criteria as specified in the request is met and the problem is solved for. Please review the
                      criteria mentioned below:
                    </p>
                    <ul>
                      <li>* The specified acceptance criteria in the request must be met</li>
                      <li>* Any performance metrics specified against provided test datasets should be met</li>
                      <li>* Submission should pass the review process for AI services on the platform</li>
                      <li>* Provide the github repo of your code</li>
                      <li>
                        * Sign your request using the same Metamask address used to publish the service. This is an
                        important step to ensure that you are the owner of the service.
                      </li>
                    </ul>
                  </div>
                  <div className={classes.solutionUrlContainer}>
                    <div>
                      <label>Solution URL</label>
                      <input
                        type="text"
                        name="solURI"
                        autoComplete="off"
                        onChange={event => setSolURI(event.target.value)}
                      />
                    </div>
                    <p>
                      The solution must be hosted on singularitynet AI Marketplace. Please refer documentation for more
                      info.
                    </p>
                  </div>
                </div>
              )}
            </Paper>
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Close" type="transparent" onClick={handleCancel} disabled />
            <StyledButton
              btnText="Submit Solution"
              type="blue"
              onClick={handleSubmit}
              disabled={actionToDisable || true}
            />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(SubmitSolution);
