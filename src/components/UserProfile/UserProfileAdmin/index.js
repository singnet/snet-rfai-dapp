import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";

const UserProfileAdmin = ({ classes }) => {
  return (
    <Grid container className={classes.adminMainContainer}>
      <Grid xs={12} sm={12} md={8} lg={8} className={classes.card}>
        <h3>Add Foundation Member</h3>
        <div className={classes.ethereumAddressMainContainer}>
          <div className={classes.ethereumAddressContainer}>
            <div className={classes.textField}>
              <span>Ethereum Address</span>
              <input type="text" />
            </div>
            <p>Please enter the etherium address of the foundation member you like to add.</p>
          </div>
          <StyledButton btnText="add foundation member" type="blue" />
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
            <TableBody className={classes.tableData}>
              <TableRow>
                <TableCell className={classes.address}>
                  <span>Ethereum Address</span>
                  0x1533234bd32f59909e1d471cf0c9bc80c92c97d20x1533234bd32f5990
                </TableCell>
                <TableCell>
                  <span>User Name</span>
                  John Doe
                </TableCell>
                <TableCell>
                  <span>Date Added</span>
                  29 Nov 2019
                </TableCell>
                <TableCell align="right">
                  <StyledButton btnText="deactive" type="red" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.address}>0x1533234bd32f5990</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>29 Nov 2019</TableCell>
                <TableCell align="right">
                  <StyledButton btnText="activate" type="transparentBlueBorder" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Grid>

      <Grid xs={12} sm={12} md={4} lg={4} className={classes.card}>
        <h3>Configuration</h3>
        <div className={classes.inputFieldContainer}>
          <div className={classes.textField}>
            <span>Ethereum Address</span>
            <input type="text" />
          </div>
          <div className={classes.textField}>
            <span>Ethereum Address</span>
            <input type="text" />
          </div>
          <div className={classes.textField}>
            <span>Ethereum Address</span>
            <input type="text" />
          </div>
        </div>
        <div className={classes.btnContainer}>
          <StyledButton btnText="save configuration" type="blue" />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(UserProfileAdmin);
