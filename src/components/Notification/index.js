import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import { metamaskActions } from "../../Redux/actionCreators";
import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";
import NotificationIcon from "@material-ui/icons/Warning";

class Notification extends Component {
  connectMetamask = async () => {
    const { updateMetamaskDetails } = this.props;

    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;
        window.web3 = new window.Web3(ethereum);

        // Enable Metamask for this Web Site
        //const accounts = await ethereum.enable();
        await ethereum.enable();

        window.web3.version.getNetwork(async (err, netId) => {
          //console.log("connectMetamask getNetwork1 account - ", window.web3.eth.defaultAccount);
          //console.log("connectMetamask accounts - ", accounts[0]);
          await updateMetamaskDetails(Boolean(window.web3.eth.defaultAccount), window.web3.eth.defaultAccount, netId);
        });

        // Subscribe to Metamask after connection
        this.subscribeToMetamask();
      } catch (error) {
        // User denied account access...
        updateMetamaskDetails(false, "0x0", 0);
      }
    }
  };

  subscribeToMetamask = () => {
    const { updateMetamaskDetails } = this.props;
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      try {
        window.web3.currentProvider.publicConfigStore.on("update", () => {
          window.web3.version.getNetwork(async (err, netId) => {
            //console.log("subscribeToMetamask account - ", window.web3.eth.defaultAccount);
            await updateMetamaskDetails(Boolean(window.web3.eth.defaultAccount), window.web3.eth.defaultAccount, netId);
          });
        });
      } catch (error) {
        // User denied account access...
        updateMetamaskDetails(false, "0x0", 0);
      }
    }
  };

  loadMetamaskDetails = () => {
    const { updateMetamaskDetails } = this.props;
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      try {
        window.web3.version.getNetwork(async (err, netId) => {
          //console.log("loadMetamaskDetails account - ", window.web3.eth.defaultAccount);
          await updateMetamaskDetails(Boolean(window.web3.eth.defaultAccount), window.web3.eth.defaultAccount, netId);
        });
      } catch (error) {
        // User denied account access...
        updateMetamaskDetails(false, "0x0", 0);
      }
    }
  };

  generateNotificationMessage = () => {
    const { metamaskDetails } = this.props;

    var message = "";

    if (window.ethereum) {
      //console.log("metamaskDetails.isConnected - ", metamaskDetails.isConnected);
      //console.log("metamaskDetails.networkId - ", metamaskDetails.networkId);

      if (!metamaskDetails.isConnected) {
        message = (
          <span>
            Click to connect with Metamask <button onClick={this.connectMetamask}>Connect</button>
          </span>
        );
      } else if (metamaskDetails.networkId !== "3") {
        message = "Metamask needs to be connected to network Id 3";
      } else if (metamaskDetails.account === null || metamaskDetails.account === "0x0") {
        message = "Click to connect with Metamask";
      } else {
        message = "Metamask connected successfully";
      }
    } else {
      message = "Need to have Metamask enabled browser";
    }

    return message;
  };

  componentDidMount = async () => {
    await this.loadMetamaskDetails();
  };

  render() {
    // Actual Code
    //const { classes, metamaskDetails } = this.props;
    const message = this.generateNotificationMessage();

    // TODO: Line to be deleted added for Debugg only
    const showNotificationBar = true;
    // Actual Code
    //const showNotificationBar = (metamaskDetails.isConnected && metamaskDetails.networkId === "3")

    return (
      <NotificationBar
        type={notificationBarTypes.WARNING}
        message={message}
        icon={NotificationIcon}
        showNotification={showNotificationBar}
        buttonClick={this.connectMetamask}
      />
    );
  }
}

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

const mapDispatchToProps = dispatch => ({
  updateMetamaskDetails: (isConnected, account, networkId) =>
    dispatch(metamaskActions.updateMetamaskDetails(isConnected, account, networkId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Notification));
