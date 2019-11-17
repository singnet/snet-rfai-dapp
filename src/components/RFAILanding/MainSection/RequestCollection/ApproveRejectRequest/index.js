import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

import AlertBox, { alertTypes } from "../../../../common/AlertBox";
import { requestDetailsById } from "../../../../../Redux/reducers/RequestReducer";
import {
  getBlockNumber,
  waitForTransaction,
  approveRequest,
  rejectRequest,
} from "../../../../../utility/BlockchainHelper";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { loaderActions } from "../../../../../Redux/actionCreators";

const ApproveRejectRequest = ({
  open,
  handleClose,
  requestId,
  actionType,
  requestDetails,
  metamaskDetails,
  startLoader,
  stopLoader,
}) => {
  const classes = useStyles();

  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);
  const [endSubmission, setEndSubmission] = useState(0);
  const [endEvaluation, setEndEvaluation] = useState(0);
  const [newExpiration, setNewExpiration] = useState(0);

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });

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

  const handleCancel = () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
  };

  const handleApprove = async () => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    if (
      parseInt(endSubmission, 10) < parseInt(endEvaluation, 10) &&
      parseInt(endEvaluation, 10) < parseInt(newExpiration, 10) &&
      parseInt(newExpiration, 10) > parseInt(currentBlockNumber, 10)
    ) {
      try {
        // Initiate the Deposit Token to RFAI Escrow
        let txHash = await approveRequest(metamaskDetails, requestId, endSubmission, endEvaluation, newExpiration);

        startLoader(LoaderContent.APPROVE_REQUEST);

        // Wait for the transaction to be completed
        await waitForTransaction(txHash);

        setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

        stopLoader();
      } catch (err) {
        setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
        stopLoader();
      }
    } else if (parseInt(endSubmission, 10) >= parseInt(endEvaluation, 10)) {
      setAlert({ type: alertTypes.ERROR, message: "Invalid end submission block number" });
    } else if (parseInt(endEvaluation, 10) >= parseInt(newExpiration, 10)) {
      setAlert({ type: alertTypes.ERROR, message: "Invalid end evaluation block number" });
    } else if (parseInt(newExpiration, 10) <= parseInt(currentBlockNumber, 10)) {
      setAlert({ type: alertTypes.ERROR, message: "Invalid expiration block number" });
    }
  };

  const handleReject = async () => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    try {
      // Initiate the Deposit Token to RFAI Escrow
      let txHash = await rejectRequest(metamaskDetails, requestId);

      startLoader(LoaderContent.REJECT_REQUEST);

      // Wait for the transaction to be completed
      await waitForTransaction(txHash);

      setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

      stopLoader();
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      stopLoader();
    }
  };

  const handleBlockNumInputChange = async event => {
    var val = "";
    if (event.target.value.match(/^[0-9]{1,40}$/)) {
      val = event.target.value;
    } else if (event.target.value === "") {
      val = "";
    } else {
      // Just Ignore the value
    }

    switch (event.target.name) {
      case "endSubmission":
        setEndSubmission(val);
        break;
      case "endEvaluation":
        setEndEvaluation(val);
        break;
      case "newExpiration":
        setNewExpiration(val);
        break;
    }
  };

  const approveComponent = () => {
    return (
      <Paper className={classes.root}>
        <div className={classes.requestTitle}>
          <span>Request Title: </span>
          <p>{requestDetails.request_title}</p>
        </div>
        <div className={classes.requestedByAndExpiryContainer}>
          <div className={classes.requestedBy}>
            <span>Request By</span>
            <p>{requestDetails.requester}</p>
          </div>
          <div className={classes.expirySet}>
            <span>Expiry Set By Requester</span>
            <p>{requestDetails.expiration}</p>
          </div>
        </div>
        <div className={classes.currentBlockNumber}>
          <span>Current Block Number: </span>
          <p>{currentBlockNumber}</p>
        </div>

        <div className={classes.inputFieldContainer}>
          <div>
            <label>End Submission Block:</label>
            <input
              name="endSubmission"
              type="number"
              autoComplete="off"
              value={endSubmission}
              min={currentBlockNumber}
              onChange={handleBlockNumInputChange}
            />
          </div>

          <div>
            <label>End Evaluation Block:</label>
            <input
              name="endEvaluation"
              type="number"
              autoComplete="off"
              value={endEvaluation}
              min={currentBlockNumber}
              onChange={handleBlockNumInputChange}
            />
          </div>

          <div>
            <label>Expiration Block:</label>
            <input
              name="newExpiration"
              type="number"
              autoComplete="off"
              value={newExpiration}
              min={currentBlockNumber}
              onChange={handleBlockNumInputChange}
            />
          </div>
        </div>
      </Paper>
    );
  };

  const rejectComponent = () => {
    return (
      <Paper className={classes.root}>
        <div className={classes.requestTitle}>
          <span>Request Title: </span>
          <p>{requestDetails.request_title}</p>
        </div>
        <div className={classes.requestedByAndExpiryContainer}>
          <div className={classes.requestedBy}>
            <span>Request By</span>
            <p>{requestDetails.requester}</p>
          </div>
          <div className={classes.requestedBy}>
            <span>Token Awarded</span>
            <p>{requestDetails.total_stake}</p>
          </div>
        </div>
      </Paper>
    );
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
            title={actionType + " Request"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            {actionType === "Approve" ? approveComponent() : rejectComponent()}
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="cancel" type="transparent" onClick={handleCancel} />
            {actionType === "Approve" && <StyledButton btnText="Approve Request" onClick={handleApprove} />}
            {actionType === "Reject" && <StyledButton btnText="Reject Request" type="redBg" onClick={handleReject} />}
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
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
)(ApproveRejectRequest);
