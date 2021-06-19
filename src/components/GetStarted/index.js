import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import GetStartedDescription from "./GetStartedDescription";

import { GetStartedCategoriesData } from "../../utility/constants/GetStarted";
import Category from "./Category";
import StyledButton from "../common/StyledButton";
import { useStyles } from "./styles";
import Routes from "../../utility/constants/Routes";
import { Link } from "react-router-dom";

const GetStarted = ({ classes, history }) => {
  return (
    <Grid container spacing={24} className={classes.GetStartedMainContaienr}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.TopSection}>
        <GetStartedDescription
          title={"How the Request For AI (RFAI) Works"}
          description={"Get an overview of how it works"}
        />
      </Grid>
      {GetStartedCategoriesData.map((item, index) => (
        <Category
          key={item.categoryTitle}
          title={item.title}
          content={item.content}
          media={item.media}
          rightAlign={(index + 1) % 2 === 0}
        />
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.btnContainer}>
        <Link to={Routes.CREATE_REQUEST} className={classes.createRequestLink} onClick={e => e.preventDefault()}>
          <StyledButton type="blue" btnText="Create new Request" disabled />
        </Link>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(GetStarted);
