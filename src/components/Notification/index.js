import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import { useStyles } from "./styles";
import { metamaskActions, userActions } from "../../Redux/actionCreators";
import { tokenActions } from "../../Redux/actionCreators";
import { rfaiContractActions } from "../../Redux/actionCreators";

import NotificationBar, { notificationBarTypes } from "../common/NotificationBar";
import NotificationIcon from "@material-ui/icons/Warning";

import { NetworkNames } from "../../utility/constants/NetworkNames";
import { toChecksumAddress } from "../../utility/GenHelperFunctions";
import isEmpty from "lodash/isEmpty";

class Notification extends Component {
  connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;

        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);

        // const _netId = ethereum.networkVersion;
        // console.log("1. ethereum.networkVersion - ", ethereum.networkVersion);

        // const _selectedAddress = ethereum.selectedAddress;
        // console.log("1. ethereum.selectedAddress - ", _selectedAddress);

        // const _accounts = await ethereum.request({ method: "eth_requestAccounts" });
        // console.log("1. eth_requestAccounts _accounts[0] - ", _accounts[0]);

        // const _accounts2 = await ethereum.request({ method: "eth_accounts" });
        // console.log("1. eth_accounts _accounts2[0] - ", _accounts2[0]);

        //await ethereum.request({ method: 'eth_accounts' });
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length > 0) {
          const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
          await this.storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);
        }

        // Subscribe to Metamask after connection
        this.subscribeToMetamask();
      } catch (_error) {
        // User denied account access...
        this.storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  subscribeToMetamask = async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum;

      try {
        // const _netId = ethereum.networkVersion;
        // console.log("2. ethereum.networkVersion - ", ethereum.networkVersion);

        // const _selectedAddress = ethereum.selectedAddress;
        // console.log("2. ethereum.selectedAddress - ", _selectedAddress);

        // const _accounts = await ethereum.request({ method: "eth_requestAccounts" });
        // console.log("2. eth_requestAccounts _accounts[0] - ", _accounts[0]);
        // console.log("2. eth_requestAccounts _accounts - ", _accounts);

        // const _accounts2 = await ethereum.request({ method: "eth_accounts" });
        // console.log("2. eth_accounts _accounts2[0] - ", _accounts2[0]);
        // console.log("2. eth_accounts _accounts2 - ", _accounts2);

        // On Network Change
        ethereum.on("chainChanged", _chainId => {
          window.location.reload();
        });

        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);
        // On Account Change
        ethereum.on("accountsChanged", async accounts => {
          if (accounts.length > 0) {
            const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
            await this.storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);
          } else {
            await this.storeMetamaskDetails(false, "0x0", 0, false);
          }
        });
      } catch (_error) {
        // User has denied account access...
        await this.storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  loadMetamaskDetails = async () => {
    const {
      metamaskDetails,
      updateTokenBalance,
      updateTokenAllowance,
      updateRFAITokenBalance,
      isLoggedIn,
      fetchWallet,
      walletList,
    } = this.props;
    //console.log("loadMetamaskDetails called....");
    if (!isLoggedIn) {
      this.storeMetamaskDetails(false, "0x0", 0, false);
      return;
    } else {
      if (isEmpty(walletList)) {
        //console.log("Fecth API Called from Notification Component....");
        await fetchWallet();
      }
    }

    if (window.ethereum) {
      const ethereum = window.ethereum;

      try {
        // const _netId = ethereum.networkVersion;
        // console.log("3. ethereum.networkVersion - ", ethereum.networkVersion);

        // const _selectedAddress = ethereum.selectedAddress;
        // console.log("3. ethereum.selectedAddress - ", _selectedAddress);

        // const _accounts = await ethereum.request({ method: "eth_requestAccounts" });
        // console.log("3. eth_requestAccounts _accounts[0] - ", _accounts[0]);

        // const _accounts2 = await ethereum.request({ method: "eth_accounts" });
        // console.log("3. eth_accounts _accounts2[0] - ", _accounts2[0]);

        const chainId = ethereum.chainId;
        const netId = parseInt(chainId);

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length > 0) {
          const isTxnsAllowed = Boolean(accounts[0]) && netId.toString() === process.env.REACT_APP_ETH_NETWORK;
          await this.storeMetamaskDetails(Boolean(accounts[0]), toChecksumAddress(accounts[0]), netId, isTxnsAllowed);

          // Subscribe to Metamask for the connection already exists
          this.subscribeToMetamask();

          await updateTokenBalance(metamaskDetails);
          await updateTokenAllowance(metamaskDetails);
          await updateRFAITokenBalance(metamaskDetails);
        } else {
          await this.storeMetamaskDetails(false, "0x0", 0, false);
        }
      } catch (_error) {
        // User denied account access...
        this.storeMetamaskDetails(false, "0x0", 0, false);
      }
    }
  };

  generateNotificationMessage = () => {
    const { metamaskDetails, isLoggedIn } = this.props;

    var message = "";

    if (!isLoggedIn) {
      message = "User need to login to the RFAI DApp.";
      return message;
    }

    const networkName = NetworkNames.find(nw => nw.networkId.toString() === process.env.REACT_APP_ETH_NETWORK)
      .networkName;

    if (window.ethereum) {
      if (!metamaskDetails.isConnected) {
        message = (
          <span>
            Click to connect with Metamask <button onClick={this.connectMetamask}>Connect</button>
          </span>
        );
      } else if (metamaskDetails.networkId !== process.env.REACT_APP_ETH_NETWORK) {
        message = "Metamask needs to be connected to network " + networkName;
      } else if (metamaskDetails.account === null || metamaskDetails.account === "0x0") {
        message = "Click to connect with Metamask";
      } else {
        message = "Metamask connected successfully " + networkName;
      }
    } else {
      message = "Need to have Metamask enabled browser";
    }

    return message;
  };

  componentDidMount = async () => {
    await this.loadMetamaskDetails();
  };

  storeMetamaskDetails = async (isConnected, account, networkId, isTxnsAllowed) => {
    const { updateMetamaskDetails, walletList, registerWallet } = this.props;

    await updateMetamaskDetails(isConnected, account, networkId, isTxnsAllowed);

    if (isTxnsAllowed) {
      if (!isEmpty(walletList) && account !== "0x0") {
        const wallets = walletList.filter(w => w.address.toLowerCase() === account.toLowerCase());

        // console.log("walletList --- ", walletList);
        // console.log("wallets ---", wallets);
        // console.log("wallets.length --- ", wallets.length);

        if (wallets.length === 0) {
          // Call the Register API to associate the Wallet to User
          await registerWallet(account);
        }
      } else if (account !== "0x0") {
        // Call the Register API to associate the Wallet to User
        await registerWallet(account);
      }
    }
  };

  render() {
    const { metamaskDetails, isLoggedIn } = this.props;
    const message = this.generateNotificationMessage();

    // Metamask Notifications should be shown only after user is loggedIn
    let showNotificationBar = false;
    if (isLoggedIn && !metamaskDetails.isTxnsAllowed) showNotificationBar = true;

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
  isLoggedIn: state.userReducer.login.isLoggedIn,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  walletList: state.userReducer.walletList,
});

const mapDispatchToProps = dispatch => ({
  updateMetamaskDetails: (isConnected, account, networkId, isTxnsAllowed) =>
    dispatch(metamaskActions.updateMetamaskDetails(isConnected, account, networkId, isTxnsAllowed)),
  updateTokenBalance: metamaskDetails => dispatch(tokenActions.updateTokenBalance(metamaskDetails)),
  updateTokenAllowance: metamaskDetails => dispatch(tokenActions.updateTokenAllowance(metamaskDetails)),
  updateRFAITokenBalance: metamaskDetails => dispatch(rfaiContractActions.updateRFAITokenBalance(metamaskDetails)),
  fetchWallet: () => dispatch(userActions.fetchWallet()),
  registerWallet: address => dispatch(userActions.registerWallet(address)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Notification));
