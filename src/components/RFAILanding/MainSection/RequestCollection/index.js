import React from "react";

import { useStyles } from "./styles";

import RequestTab from "./RequestTab";

const RequestCollection = ({ requestSummary }) => {
  const classes = useStyles();
  return (
    <div className={classes.requestCollection}>
      <RequestTab selectedTabProp={1} requestSummary={requestSummary} />
    </div>
  );
};

export default RequestCollection;
