import React from "react";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import NavBar from "./NavBar";
import Title from "./Title";
import MobileHeader from "./MobileHeader";

const Header = ({ data, platformName }) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.mainHeader}>
        <div className={classes.logoSection}>
          <MobileHeader data={data} />
          <Title platformName={platformName} />
        </div>
        <div className={classes.navigationSection}>
          <NavBar data={data} />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({ isLoggedIn: state.userReducer.login.isLoggedIn });

export default connect(mapStateToProps)(Header);
