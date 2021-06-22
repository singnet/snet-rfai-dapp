import React from "react";
import { withStyles } from "@material-ui/styles";
// import CloseIcon from "@material-ui/icons/Close";
import AnnoucementIcon from "../../../assets/images/AnnoucementIcon.png";

import { useStyles } from "./styles";

const UpdateNotificationBar = ({ classes, showNotification, onCloseClick }) => {
  if (!showNotification) return null;
  return (
    <div className={classes.updateNotificationBar}>
      <div>
        <img src={AnnoucementIcon} alt="Announcment" />
      </div>
      <div className={classes.content}>
        <p>Dear SingularityNET supporter,</p>
        <p>
          We are in the process of making some changes to RFAI portal and community-driven AI development support in
          general. To avoid unnecessary spending of AGIX or transaction costs, we have disabled new entries to the
          portal, until further notice. Stay tuned and follow our social media channels to be informed about the many
          exciting developments to come!
        </p>
      </div>
      {/* <div>
        <CloseIcon className={classes.closeIcon} onClick={onCloseClick} />
      </div> */}
    </div>
  );
};

export default withStyles(useStyles)(UpdateNotificationBar);
