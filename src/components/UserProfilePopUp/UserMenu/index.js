import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";

import UserMenuItem from "./UserMenuItem";
import { useStyles } from "./styles";
import { UserMenuList, UserMenuActionList } from "../../../utility/constants/UserPopupMenu";
import UserMenuAction from "./UserMenuAction";

const UserMenu = ({ classes, handleClick, metamaskDetails, foundationMembers }) => {
  const isFoundationMember = () => {
    var _isFoundationMember = false;
    if (metamaskDetails.isTxnsAllowed && Object.entries(foundationMembers).length > 0) {
      const mems = foundationMembers.filter(
        mem => mem.member_address.toLowerCase() === metamaskDetails.account.toLowerCase() && mem.active
      );
      if (mems.length > 0) _isFoundationMember = true;
    }
    return _isFoundationMember;
  };

  const loadMenus = menu => {
    if (menu.menuTitle !== "Admin" || (menu.menuTitle === "Admin" && isFoundationMember())) {
      return <UserMenuItem key={menu.menuTitle} icon={menu.menuIcon} title={menu.menuTitle} linkTo={menu.menuLink} />;
    }
    return null;
  };

  const loadMenuActions = action => {
    if (action.Title !== "Admin" || (action.Title === "Admin" && isFoundationMember())) {
      return (
        <UserMenuAction key={action.Title} icon={action.menuIcon} title={action.menuTitle} action={action.action} />
      );
    }

    return null;
  };

  return (
    <ul onClick={handleClick} className={classes.userMenuItemList}>
      {UserMenuList.map(menu => loadMenus(menu))}
      <Divider />
      {UserMenuActionList.map(action => loadMenuActions(action))}
    </ul>
  );
};

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  foundationMembers: state.requestReducer.foundationMembers,
});

//export default withStyles(useStyles)(UserMenu);
export default connect(mapStateToProps)(withStyles(useStyles)(UserMenu));
