import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import SnetSvgLogo from "../../../assets/images/WhiteLogo.svg";
import Routes from "../../../utility/constants/Routes";
import { useStyles } from "./styles";

const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <h1 className={classes.h1}>
        <Link to={`/${Routes.RFAI_LANDING}`} className={classes.logoAnchor}>
          <img src={SnetSvgLogo} alt="SingularityNET" />
        </Link>
      </h1>
      <span>RFAI</span>
    </Fragment>
  );
};

export default Title;
