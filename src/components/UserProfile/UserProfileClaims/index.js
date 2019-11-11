import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";
import AccountBalance from "../../common/AccountBalance";
import StyledButton from "../../common/StyledButton";
import TransactionReceipt from "./TransactionReceipt";

const UserProfileClaims = ({ classes }) => {
  return (
    <Grid container className={classes.claimsMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.accountBalanceContainer}>
        <AccountBalance button isTxnsAllowed />
      </Grid>

      <Grid xs={12} sm={12} md={8} lg={8} className={classes.claimsContainer}>
        <h3>Claims</h3>
        <div className={classes.claimsForSolutions}>
          <h4>Claims for Solutions</h4>
          <Typography className={classes.description}>
            All claims from the solutions that you submitted will be listed here. Lorem ipsum dolor sit amet, mel debet
            dissentiet philosophia ut. Sed nibh solum temporibus in. An insolens electram pro, qui nobis ornatus
            consectetuer an.{" "}
          </Typography>
          <Grid container className={classes.tableHeader}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <span>Request Title</span>
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}>
              <span>Votes</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2}>
              <span>Completed on</span>
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}>
              <span>Days left to claim</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2} className={classes.centerAlign}>
              <span>Tokens</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2} />
          </Grid>
          <Grid container className={classes.tableData}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <span>A very long Request name</span>
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}>
              <span>12</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2}>
              <span>20 Oct 2019</span>
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}>
              <span>28 days</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2} className={classes.centerAlign}>
              <span>999 AGI</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2}>
              <StyledButton disabled type="transparentBlueBorder" btnText="claim" />
            </Grid>
          </Grid>
          <Grid container className={classes.tableData}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <span>A very long Request name</span>
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}>
              <span>12</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2}>
              <span>20 Oct 2019</span>
            </Grid>
            <Grid xs={12} sm={12} md={1} lg={1}>
              <span>28 days</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2} className={classes.centerAlign}>
              <span>999 AGI</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2}>
              <StyledButton disabled type="transparentBlueBorder" btnText="claim" />
            </Grid>
          </Grid>
        </div>
        <div className={classes.claimsForRequest}>
          <h4>Claims for Request</h4>
          <Typography className={classes.description}>
            All claims from the solutions that you submitted will be listed here. Lorem ipsum dolor sit amet, mel debet
            dissentiet philosophia ut. Sed nibh solum temporibus in. An insolens electram pro, qui nobis ornatus
            consectetuer an.{" "}
          </Typography>
          <Grid container className={classes.tableHeader}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <span>Request Title</span>
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3}>
              <span>Reason for claim</span>
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3}>
              <span>tokens backed</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2} />
          </Grid>
          <Grid container className={classes.tableData}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <span>A very long Request name</span>
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3}>
              <span>Request Rejected</span>
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3}>
              <span>999 AGI</span>
            </Grid>
            <Grid xs={12} sm={12} md={2} lg={2}>
              <StyledButton disabled type="transparentBlueBorder" btnText="claim" />
            </Grid>
          </Grid>
        </div>
      </Grid>

      <TransactionReceipt
        succesMsg="Claim for Request Succesfully Processed"
        receiptHeader="Claim"
        requestTitle="A very long service provider request"
      />
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileClaims);
