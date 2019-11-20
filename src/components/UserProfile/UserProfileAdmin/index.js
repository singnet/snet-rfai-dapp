import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";
import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";
import AlertBox, { alertTypes } from "../../common/AlertBox";

import { waitForTransaction, addOrUpdateFoundationMembers } from "../../../utility/BlockchainHelper";
import web3 from "web3";

const UserProfileAdmin = ({ classes, metamaskDetails, foundationMembers, startLoader, stopLoader }) => {
  const [alert, setAlert] = useState({ type: alertTypes.ERROR, message: undefined });
  const [foundationMember, SetFoundationMember] = useState("");
  const [memberRole, SetMemberRole] = useState(0); //Normal User, 1-Admin User who can add other members

  // eslint-disable-next-line no-unused-vars
  const [minStake, SetMinStake] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [maxStakers, SetMaxStakers] = useState(1);

  const createOrUpdateMember = async (_foundationMember, _memberRole, _isActive) => {
    let txHash;

    try {
      // Initiate the Deposit Token to RFAI Escrow
      txHash = await addOrUpdateFoundationMembers(metamaskDetails, _foundationMember, _memberRole, _isActive);
      startLoader(LoaderContent.FOUNDATION_MEMBER);
      await waitForTransaction(txHash);

      setAlert({ type: alertTypes.SUCCESS, message: `Transaction has been completed successfully` });
      stopLoader();
    } catch (err) {
      setAlert({ type: alertTypes.ERROR, message: `Transaction has failed.` });
      stopLoader();
    }
  };

  const handleAddMember = async () => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    // Check for the Valid Address
    const validAddress = web3.utils.isAddress(foundationMember);

    if (validAddress) {
      // Assuming addition of new member as Active. If not we need to add another field in the form to capture
      let isActive = true;
      // Create or Update the Foundation Member
      await createOrUpdateMember(foundationMember, memberRole, isActive);
    } else {
      setAlert({ type: alertTypes.ERROR, message: `Invalid Ethereum Account` });
    }
  };

  const handleUpdateActivation = async (_foundationMember, _memberRole, _Active) => {
    if (!metamaskDetails.isTxnsAllowed) {
      setAlert({ type: alertTypes.ERROR, message: `Needs connection to Metamask` });
      return;
    }

    // Check for the Valid Address
    const validAddress = web3.utils.isAddress(_foundationMember);

    if (validAddress) {
      // Create or Update the Foundation Member
      await createOrUpdateMember(_foundationMember, _memberRole, _Active);
    } else {
      setAlert({ type: alertTypes.ERROR, message: `Invalid Ethereum Account` });
    }
  };

  const loadFoundationMembers = () => {
    if (Object.entries(foundationMembers).length > 0) {
      return foundationMembers.map(m => (
        <TableRow key={m.member_address}>
          <TableCell className={classes.address}>
            <span>Ethereum Address</span>
            {m.member_address}
          </TableCell>
          <TableCell>
            <span>User Name</span>
            {"-"}
          </TableCell>
          <TableCell>
            <span>Date Added</span>
            {"-"}
          </TableCell>
          <TableCell align="right">
            {/** TODO: Need to add the Role as parameter  */}
            <StyledButton
              onClick={() => handleUpdateActivation(m.member_address, 0, !m.active)}
              btnText={m.active ? "deactivate" : "activate"}
              type={m.active ? "red" : "transparentBlueBorder"}
            />
          </TableCell>
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell>No foundation members found</TableCell>
        </TableRow>
      );
    }
  };

  return (
    <Grid container className={classes.adminMainContainer}>
      <Grid xs={12} sm={12} md={8} lg={8} className={classes.card}>
        <h3>Add Foundation Member</h3>
        <div className={classes.ethereumAddressMainContainer}>
          <div className={classes.ethereumAddressContainer}>
            <div className={classes.textField}>
              <span>Ethereum Address</span>
              <input
                type="text"
                name="txtFoundationMember"
                onChange={event => SetFoundationMember(event.target.value)}
              />
            </div>
            <p>Please enter the ethereum address of the foundation member you like to add.</p>
          </div>

          <div className={classes.ethereumAddressContainer}>
            <div className={classes.textField}>
              <span>Member Role</span>
              <select name="memberRole" defaultValue="0" onChange={event => SetMemberRole(event.target.value)}>
                <option value="1">Admin</option>
                <option value="0">Normal</option>
              </select>
            </div>
            <p>Please select the role for the member.</p>
          </div>

          <AlertBox type={alert.type} message={alert.message} />
          <StyledButton btnText="add foundation member" type="blue" onClick={handleAddMember} />
        </div>
        <hr />
        <div className={classes.foundationMemberContainer}>
          <h4>Foundation Members</h4>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell className={classes.address}>Ethereum Address</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableData}>{loadFoundationMembers()}</TableBody>
          </Table>
        </div>
      </Grid>

      <Grid xs={12} sm={12} md={4} lg={4} className={classes.card}>
        <h3>Configuration</h3>
        <div className={classes.inputFieldContainer}>
          <div className={classes.textField}>
            <span>Minimum Stake</span>
            <input name="minStake" type="number" min={1} onChange={event => SetMinStake(event.target.value)} />
          </div>
          <div className={classes.textField}>
            <span>Maximum Stakers</span>
            <input name="maxStakers" type="number" min={1} onChange={event => SetMaxStakers(event.target.value)} />
          </div>
        </div>
        {/* <div className={classes.btnContainer}>
          <StyledButton btnText="save configuration" type="blue" onClick={updateConfigurations} />
        </div> */}
      </Grid>
    </Grid>
  );
};

UserProfileAdmin.defaultProps = {
  foundationMembers: [],
};

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  foundationMembers: state.requestReducer.foundationMembers,
});

const mapDispatchToProps = dispatch => ({
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(UserProfileAdmin));
