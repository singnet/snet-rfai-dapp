import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
// Table dependencies
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import AlertBox, { alertTypes } from "../../../../common/AlertBox";
import { requestDetailsById } from "../../../../../Redux/reducers/RequestReducer";
import { toWei, fromWei, computeDateFromBlockNumber } from "../../../../../utility/GenHelperFunctions";
import { getBlockNumber, waitForTransaction, stakeForRequest } from "../../../../../utility/BlockchainHelper";

import web3 from "web3";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import { LoaderContent } from "../../../../../utility/constants/LoaderContent";
import { rfaiContractActions, loaderActions } from "../../../../../Redux/actionCreators";

const StakeRequest = ({
  open,
  handleClose,
  requestId,
  requestDetails,
  rfaiTokenBalance,
  loading,
  metamaskDetails,
  updateRFAITokenBalance,
  startLoader,
  stopLoader,
}) => {
  const classes = useStyles();
  const BN = web3.utils.BN;

  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });
  const [amount, setAmount] = useState(0);
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

  const handleCancel = () => {
    setAlert({ type: alertTypes.ERROR, message: undefined });
    handleClose();
  };

  const handleSubmit = async () => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    //value, expiration, documentURI
    const zeroBN = new BN(0);
    const amountBN = new BN(toWei(amount));
    const rfaiTokenBalanceBN = new BN(rfaiTokenBalance);

    if (amountBN.lte(rfaiTokenBalanceBN) && amountBN.gt(zeroBN)) {
      try {
        // Initiate the Deposit Token to RFAI Escrow
        let txHash = await stakeForRequest(metamaskDetails, requestId, amountBN);

        startLoader(LoaderContent.STAKE_REQUEST);

        // Wait for the transaction to be completed
        await waitForTransaction(txHash);

        setAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });

        stopLoader();

        // Call the dependent dispatchers for updates
        updateRFAITokenBalance(metamaskDetails);
      } catch (err) {
        setAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
        stopLoader();
      }
    } else {
      setAlert({ type: alertTypes.ERROR, message: `Not enough balance in the Escrow` });
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
            title={"Back the Request"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <div className={classes.requestTitleContainer}>
            <span className={classes.requestTitle}>Request Title : </span>
            <span className={classes.titleName}>{requestDetails.request_title}</span>
          </div>
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING BACKERS..</p>
                  </div>
                </div>
              )}
              {!loading && (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Requested By</TableCell>
                      <TableCell align="right">Tokens Awarded</TableCell>
                      <TableCell align="right">Backers</TableCell>
                      <TableCell align="right">Expiry</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="td" scope="row">
                        <span className={classes.mobileTableHeader}>Requested By:</span>
                        {requestDetails.requester}
                      </TableCell>
                      <TableCell align="right">
                        <span className={classes.mobileTableHeader}>Toekns Awarded:</span>
                        {requestDetails.total_stake}
                      </TableCell>
                      <TableCell align="right">
                        <span className={classes.mobileTableHeader}>Backers:</span>
                        {requestDetails.num_stakers}
                      </TableCell>
                      <TableCell align="right">
                        <span className={classes.mobileTableHeader}>Expiry:</span>
                        {computeDateFromBlockNumber(currentBlockNumber, requestDetails.expiration)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
              <div className={classes.inputContainer}>
                <div className={classes.escrowBalContainer}>
                  <label>Escrow Balance in AGI</label>
                  <input
                    name="escrowBalance"
                    type="number"
                    autoComplete="off"
                    value={fromWei(rfaiTokenBalance)}
                    readOnly
                  />
                </div>
                <div className={classes.fundingAmtContainer}>
                  <label>Funding Amount</label>
                  <input
                    name="amount"
                    type="number"
                    autoComplete="off"
                    min={1}
                    onChange={event => setAmount(event.target.value)}
                  />
                </div>
              </div>
            </Paper>
            <AlertBox type={alert.type} message={alert.message} />
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Close" type="transparent" onClick={handleCancel} />
            <StyledButton btnText="submit funds" type="blue" onClick={handleSubmit} />
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
    rfaiTokenBalance: state.rfaiContractReducer.rfaiTokenBalance,
  };
};

const mapDispatchToProps = dispatch => ({
  updateRFAITokenBalance: metamaskDetails => dispatch(rfaiContractActions.updateRFAITokenBalance(metamaskDetails)),
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeRequest);
