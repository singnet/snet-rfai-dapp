import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { stylesActions } from "../../../../Redux/actionCreators";
import CloseIcon from "@material-ui/icons/Close";

import NavItem from "../NavItem";
import { useStyles } from "./styles";

const MobileHeader = ({ classes, data, hamburgerMenu, updateHamburgerState }) => {
  const toggleMobileMenu = () => {
    updateHamburgerState(!hamburgerMenu);
  };

  if (!hamburgerMenu) {
    return (
      <div className={classes.hamburger} onClick={toggleMobileMenu}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.mobileNavContainer}>
        <div className={classes.closeMenuIcon}>
          <CloseIcon onClick={toggleMobileMenu} />
        </div>
        <nav className={classes.mobileNavigation}>
          <ul>
            {data.map(tab => (
              <NavItem key={tab.title} title={tab.title} link={tab.link} active={tab.active} />
            ))}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = dispatch => ({
  updateHamburgerState: hamburgerState => dispatch(stylesActions.updateHamburgerState(hamburgerState)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MobileHeader));
