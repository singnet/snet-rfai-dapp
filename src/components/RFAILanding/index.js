import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import MainSection from "./MainSection";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";

import Notification from "../Notification";

const RFAILanding = ({ classes, isLoggedIn }) => {
  return (
    <Fragment>
      <Notification />
      <div className={classes.RFAILandingContainer}>
        <div className={classes.mainWrapper}>
          <Grid container spacing={24} className={classes.topSectionCotainer}>
            <Grid item xs={12} sm={3} md={3} lg={3} className={classes.titleContainer}>
              <h2 className={classes.title}>Request for AI</h2>
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={9} className={classes.descriptionContainer}>
              <div className={classes.description}>
                <span>Welcome</span>
                <p>
                  This community portal allows you to make project requests for new AI services that currently are not
                  available on the market. In addition, you can fund these projects, view other solutions, and submit
                  solutions to claim AGIX token rewards.
                </p>
              </div>
              {isLoggedIn ? (
                <div className={classes.btnContainer}>
                  <Link to={Routes.CREATE_REQUEST} className={classes.signupLink}>
                    <StyledButton type="blue" btnText="Create new Request" />
                  </Link>
                </div>
              ) : (
                <div className={classes.loginContainer}>
                  <p>
                    Please <Link to={Routes.LOGIN}>Login</Link> or <Link to={Routes.SIGNUP}>Signup</Link> to use the
                    full features of Request for AI [RFAI] platform.
                  </p>
                </div>
              )}
            </Grid>
          </Grid>
          <div>
            <MainSection />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(RFAILanding));
