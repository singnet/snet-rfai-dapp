import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import AccountBalance from "../../common/AccountBalance";
import AlertBox from "../../common/AlertBox";
import StyledDropdown from "../../common/StyledDropdown";

const UserProfileAccount = ({ classes }) => {
  const [alert] = useState({});
  return (
    <Grid container className={classes.accountMainContainer}>
      <Grid xs={12} sm={12} md={4} lg={4} className={classes.accountContainer}>
        <h3>Payment / Transfer Method</h3>
        <div className={classes.accountWrapper}>
          <div className={classes.dropDown}>
            <span className={classes.dropDownTitle}>Wallet</span>
            <StyledDropdown />
          </div>
          <AccountBalance />
          <AlertBox type={alert.type} message={alert.message} />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileAccount);
