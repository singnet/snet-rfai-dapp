import React, { Fragment } from "react";

import { useStyles } from "./styles";

const withInAppWrapper = InputComponent => {
  return props => {
    const classes = useStyles();

    return (
      <Fragment>
        <div className={classes.scrollableContent}>
          <InputComponent {...props} />
        </div>
      </Fragment>
    );
  };
};

export default withInAppWrapper;
