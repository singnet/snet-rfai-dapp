import React from "react";

import { withStyles } from "@material-ui/styles";

import StyledButton from "../common/StyledButton";
import { useStyles } from "./styles";

const RFAILanding = ({ classes }) => {
  return (
    <div className={classes.disabledPortalMainContainer}>
      <div className={classes.disabledPortalMainWrapper}>
        <div className={classes.letterMainContainer}>
          <span>RFAI Portal Disabled</span>
          <div className={classes.letterContainer}>
            <span>Dear SingularityNET Supporter,</span>
            <div className={classes.letterBody}>
              <p>
                We are in the process of making some changes to RFAI portal and community-driven AI development support
                in general. To avoid unnecessary spending of AGIX or transaction costs, we have disabled new entries to
                the portal, until further notice. For any help or information contact support{" "}
                <a href="#" title="here">
                  here.
                </a>
              </p>
              <p>
                Stay tuned and follow our social media channels to be informed about the many exciting development to
                come!
              </p>
            </div>
            <div className={classes.letterFoot}>
              <span>Thanks,</span>
              <spa>SingularityNET Team</spa>
            </div>
          </div>
        </div>
        <div className={classes.lookingForNewAIServiceContainer}>
          <img src="http://placehold.it/100x100" alt="Looking for New AI Service" />
          <div>
            <span>Looking for New AI Service?</span>
            <p>
              If you're looking for a partner with experience in creating personalized AI Solutions, we are happy to
              help. Fill out your information at the link below and we will contact you shortly.
            </p>
            <StyledButton btnType="blue" btnText="request new ai solution" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(RFAILanding);
