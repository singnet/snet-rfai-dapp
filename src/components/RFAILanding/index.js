import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import StyledButton from "../common/StyledButton";
import MainSection from "./MainSection";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";
//import { Button } from "@material-ui/core";

const RFAILanding = ({ classes, isLoggedIn }) => {
  return (
    <div className={classes.RFAILandingContainer}>
      <div className={classes.mainWrapper}>
        <Grid container spacing={24} className={classes.topSectionCotainer}>
          <Grid item xs={12} sm={3} md={3} lg={3} className={classes.titleContainer}>
            <h2 className={classes.title}>Request for AI</h2>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9} className={classes.descriptionContainer}>
            <div className={classes.description}>
              <span> Welcome to Request for AI Portal.</span>
              <p>
                With this community portal, you can make projects requests for AI services that you think the others
                will want to use. In addition you can fund projects, view solutions, and submit solutions to claim AGI
                token rewards.
              </p>
              <Link to={Routes.CREATE_REQUEST}>
                <StyledButton type="blue" btnText="Create Request" />
              </Link>
            </div>
            <Link to={Routes.SIGNUP} className={classes.signupLink}>
              {!isLoggedIn && <StyledButton type="blue" btnText="Sign up for the free trial" />}
            </Link>
          </Grid>
        </Grid>
        <div>
          <MainSection />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
});

export default connect(mapStateToProps)(withStyles(useStyles)(RFAILanding));
