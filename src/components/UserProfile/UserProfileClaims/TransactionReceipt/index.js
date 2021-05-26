import React from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { useStyles } from "./styles";

//components
import StyledButton from "../../../common/StyledButton";
import AlertText from "../../../common/AlertText";

const TransactionReceipt = ({ classes, open, handleClose }) => {
  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCancel} className={classes.Modal}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.CardHeader}
          title={"Claims"}
          action={
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.CardContent}>
          <div className={classes.transactionReceiptTitleContainer}>
            <div>
              <span>Request title:</span>
              <p>a very long long service provider request</p>
            </div>
          </div>
          <div className={classes.succesMsgBox}>
            <AlertText type="success" message="Succesfully Created Request" />
          </div>
          <div className={classes.transactionReceiptMainContainer}>
            <h4>Transaction Receipt</h4>
            <div className={classes.transactionReceiptContainer}>
              <div>
                <div className={classes.receiptTitle}>
                  <InfoIcon className={classes.infoIcon} />
                  <span>AGIX tokens received</span>
                </div>
                <span className={classes.receiptAmt}>4 AGIX</span>
              </div>
              <div>
                <div className={classes.receiptTitle}>
                  <InfoIcon className={classes.infoIcon} />
                  <span>Updated Balance</span>
                </div>
                <span className={classes.receiptAmt}>21 AGIX</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions className={classes.btnContainer}>
          <StyledButton type="blueText" btnText="close" />
        </CardActions>
      </Card>
    </Modal>
  );
};
export default withStyles(useStyles)(TransactionReceipt);
