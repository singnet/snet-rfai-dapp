import React from "react";

import { withStyles } from "@material-ui/styles";

import lookingForServiceIcon from "../../assets/images/lookingForService.svg";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useStyles } from "./styles";
import { Fragment } from "react";

const RFAILanding = ({ classes }) => {
  const headerTabs = [
    {
      title: "AI Marketplace",
      link: "https://beta.singularitynet.io/",
      newTab: true,
    },
    {
      title: "AI Developer",
      link: "https://dev.singularitynet.io/",
      newTab: true,
    },
  ];

  const openGoogleForm = () => {
    window.open("https://beta.singularitynet.io/airequestform");
  };

  return (
    <Fragment>
      <Header data={headerTabs} portalName="RFAI" />
      <div className={classes.disabledPortalMainContainer}>
        <div className={classes.disabledPortalMainWrapper}>
          <div className={classes.letterMainContainer}>
            <span>RFAI Portal Update</span>
            <div className={classes.letterContainer}>
              <span>Dear SingularityNET Supporter,</span>
              <div className={classes.letterBody}>
                <p>
                  We are in the process of making some changes to RFAI portal and community-driven AI development
                  support in general. To avoid unnecessary spending of AGIX or transaction costs, we have suspended new
                  entries to the portal, until further notice. For any help or information contact support{" "}
                  <a href="https://singularitynet.io/contact/" title="here" target="_blank">
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
            <img src={lookingForServiceIcon} alt="Looking for New AI Service" />
            <div>
              <span>Looking for New AI Service?</span>
              <p>
                If you have a need for a specific AI service, we would love to know! We will discuss the details with
                you or use your suggestion to incentivize our network.
              </p>
              <button onClick={openGoogleForm}>request ai form</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default withStyles(useStyles)(RFAILanding);
