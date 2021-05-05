import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AlertBox, { alertTypes } from "../../common/AlertBox";

import { useStyles } from "./styles";
import AccountBalance from "../../common/AccountBalance";
import StyledButton from "../../common/StyledButton";
import { requestActions, loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { claimRequest, claimBackRequest } from "../../../utility/BlockchainHelper";
import { fromWei } from "../../../utility/GenHelperFunctions";

const UserProfileClaims = ({
  classes,
  metamaskDetails,
  requestSubmitterClaims,
  requestStakerClaims,
  fetchRequestClaimData,
  loading,
  startLoader,
  stopLoader,
  isLoggedIn,
}) => {
  const [submitterAlert, setSubmitterAlert] = useState({ type: alertTypes.ERROR, message: undefined });
  const [stakerAlert, setStakerAlert] = useState({ type: alertTypes.ERROR, message: undefined });
  const actionToDisable = !(metamaskDetails.isTxnsAllowed && isLoggedIn);

  //Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // code to run on component mount
    // Fetch the Claim Data for both Submitter & Stacker
    fetchRequestClaimData(metamaskDetails, "submitter");
    fetchRequestClaimData(metamaskDetails, "stacker");
  }, [fetchRequestClaimData, metamaskDetails]);

  const initiateRequestClaim = async requestId => {
    try {
      startLoader(LoaderContent.CLAIM_REQUEST);

      // Initiate the Claim for Submitter
      await claimRequest(metamaskDetails, requestId);

      setSubmitterAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });
      stopLoader();
    } catch (err) {
      setSubmitterAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      stopLoader();
    }
  };

  const initiateRequestClaimBack = async requestId => {
    try {
      startLoader(LoaderContent.CLAIM_REQUEST);

      // Initiate the Claim for Submitter
      await claimBackRequest(metamaskDetails, requestId);

      setStakerAlert({ type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" });
      stopLoader();
    } catch (err) {
      setStakerAlert({ type: alertTypes.ERROR, message: "Transaction has failed." });
      stopLoader();
    }
  };

  const handleClaim = async (event, requestId) => {
    if (!metamaskDetails.isTxnsAllowed) {
      setSubmitterAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }
    await initiateRequestClaim(requestId);
  };

  const handleClaimBack = async (event, requestId) => {
    if (!metamaskDetails.isTxnsAllowed) {
      setStakerAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }
    await initiateRequestClaimBack(requestId);
  };

  const LoadSubmitterClaims = () => {
    if (loading) {
      return (
        <div className={classes.circularProgressContainer}>
          <div className={classes.loaderChild}>
            <CircularProgress className={classes.circularProgress} />
            <p className={classes.loaderText}>LOADING CLAIMS..</p>
          </div>
        </div>
      );
    } else if (Object.entries(requestSubmitterClaims).length === 0) {
      return (
        <div className={classes.noDataFound}>
          <span>No claims found.</span>
        </div>
      );
    } else if (!loading && requestSubmitterClaims.length > 0) {
      return requestSubmitterClaims.map(claim => (
        <Grid container key={claim.request_id} className={classes.tableData}>
          <Grid xs={12} sm={4} md={4} lg={4}>
            <span className={classes.responsiveHeader}>Request Title:</span>
            <span>{claim.request_title}</span>
          </Grid>
          <Grid xs={12} sm={1} md={1} lg={1}>
            <span className={classes.responsiveHeader}>Votes:</span>
            <span>{claim.votes}</span>
          </Grid>
          <Grid xs={12} sm={2} md={2} lg={2}>
            <span className={classes.responsiveHeader}>Completed on:</span>
            <span>{claim.end_evaluation}</span>
          </Grid>
          <Grid xs={12} sm={1} md={1} lg={1}>
            <span className={classes.responsiveHeader}>Days left to claim:</span>
            <span>{claim.expiration}</span>
          </Grid>
          <Grid xs={12} sm={2} md={2} lg={2} className={classes.centerAlign}>
            <span className={classes.responsiveHeader}>Tokens:</span>
            <span>{fromWei(claim.tokens)} AGIX</span>
          </Grid>
          <Grid xs={12} sm={2} md={2} lg={2}>
            <StyledButton
              onClick={event => handleClaim(event, claim.request_id)}
              type="transparentBlueBorder"
              btnText="claim"
              disabled={actionToDisable}
            />
          </Grid>
        </Grid>
      ));
    } else {
      return null;
    }
  };

  const LoadStackerClaims = () => {
    if (loading) {
      return (
        <div className={classes.circularProgressContainer}>
          <div className={classes.loaderChild}>
            <CircularProgress className={classes.circularProgress} />
            <p className={classes.loaderText}>LOADING CLAIMS..</p>
          </div>
        </div>
      );
    } else if (Object.entries(requestStakerClaims).length === 0) {
      return (
        <div className={classes.noDataFound}>
          <span>No claims found.</span>
        </div>
      );
    } else if (!loading && requestStakerClaims.length > 0) {
      return requestStakerClaims.map(claim => (
        <Grid container key={claim.request_id} className={classes.tableData}>
          <Grid xs={12} sm={4} md={4} lg={4}>
            <span className={classes.responsiveHeader}>Request Title:</span>
            <span>{claim.request_title}</span>
          </Grid>
          <Grid xs={12} sm={3} md={3} lg={3}>
            <span className={classes.responsiveHeader}>Reason for claim:</span>
            <span>{claim.status}</span>
          </Grid>
          <Grid xs={12} sm={3} md={3} lg={3}>
            <span className={classes.responsiveHeader}>Tokens backed:</span>
            <span>{fromWei(claim.claim_back_amount)} AGIX</span>
          </Grid>
          <Grid xs={12} sm={2} md={2} lg={2}>
            <StyledButton
              onClick={event => handleClaimBack(event, claim.request_id)}
              type="transparentBlueBorder"
              btnText="claim"
              disabled={actionToDisable}
            />
          </Grid>
        </Grid>
      ));
    } else {
      return null;
    }
  };

  return (
    <Grid container className={classes.claimsMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.accountBalanceContainer}>
        <AccountBalance />
      </Grid>

      <Grid xs={12} sm={12} md={8} lg={8} className={classes.claimsContainer}>
        <h3>Claims</h3>
        <div className={classes.claimsForSolutions}>
          <h4>Claims for Solutions</h4>
          <Typography className={classes.description}>
            All AGIX tokens you received as rewards from the solutions that you submitted will be listed here for your
            claim to your Metamask wallet.
          </Typography>
          <Grid container className={classes.tableHeader}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <span>Request Title</span>
            </Grid>
            <Grid xs={12} sm={1} md={1} lg={1}>
              <span>Votes</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2}>
              <span>Completed on</span>
            </Grid>
            <Grid xs={12} sm={1} md={1} lg={1}>
              <span>Days left to claim</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} className={classes.centerAlign}>
              <span>Tokens</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} />
          </Grid>
          <LoadSubmitterClaims />
          <AlertBox type={submitterAlert.type} message={submitterAlert.message} />
        </div>
        <div className={classes.claimsForRequest}>
          <h4>Claims for Request</h4>
          <Typography className={classes.description}>
            All claims from the requests that you backed that were closed by you, the original requester or rejected
            SingularityNET foundation will be listed here for you to claim back to your Metamask wallet. Automatic
            refunds and transfer are currently not supported.
          </Typography>
          <Grid container className={classes.tableHeader}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <span>Request Title</span>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <span>Reason for claim</span>
            </Grid>
            <Grid xs={12} sm={3} md={3} lg={3}>
              <span>Tokens backed</span>
            </Grid>
            <Grid xs={12} sm={2} md={2} lg={2} />
          </Grid>
          <LoadStackerClaims />
          <AlertBox type={stakerAlert.type} message={stakerAlert.message} />
        </div>
      </Grid>
    </Grid>
  );
};

UserProfileClaims.defaultProps = {
  requestSubmitterClaims: [],
  requestStakerClaims: [],
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  requestSubmitterClaims: state.requestReducer.requestSubmitterClaims,
  requestStakerClaims: state.requestReducer.requestStakerClaims,
  loading: state.loaderReducer.RequestModalCallStatus,
});

const mapDispatchToProps = dispatch => ({
  fetchRequestClaimData: (metamaskDetails, claimBy) =>
    dispatch(requestActions.fetchRequestClaimData(metamaskDetails, claimBy)),
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserProfileClaims));
