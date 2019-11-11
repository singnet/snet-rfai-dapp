import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import AccountBalance from "../../common/AccountBalance";

const UserProfileClaims = ({ classes }) => {
  return (
    <Grid container className={classes.claimsMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.claimsContainer}>
        <AccountBalance button isTxnsAllowed />
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileClaims);
