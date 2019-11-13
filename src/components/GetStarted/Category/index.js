import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";

import { useStyles } from "./styles";
import DummyGetStartedCard from "../../../assets/images/dummy-card.png";

const Category = ({ classes, title, description, rightAlign, media }) => {
  return (
    <Grid
      container
      spacing={24}
      className={`${classes.CategoryWrapper} ${rightAlign ? classes.reverseDirection : null}`}
    >
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryMedia}>
        <img src={media.content || DummyGetStartedCard} alt="DummyImage" className={classes.FullWidth} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryContent}>
        <div className={classes.Title}>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Category);
