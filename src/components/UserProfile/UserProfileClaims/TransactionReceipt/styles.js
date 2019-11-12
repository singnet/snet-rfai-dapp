export const useStyles = theme => ({
  summaryMainContainer: {
    paddingBottom: 40,
    "& p": {
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  transactionReceiptMainContainer: {
    width: 555,
    margin: "30px auto 40px",
    "& h4": {
      margin: 0,
      color: theme.palette.text.mediumShadeGray,
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: "20px",
    },
    "@media(max-width:720px)": {
      width: "auto",
      padding: "0 20px",
    },
  },
  transactionReceiptContainer: {
    padding: "20px 22px",
    borderRadius: 4,
    marginTop: 19,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.text.cardBackground,
    "& > div": {
      width: "100%",
      padding: "14px 0",
      display: "flex",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.lightGray,
      "&:last-of-type": { border: "none" },
    },
  },
  infoIcon: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 18,
    marginRight: 9,
    verticalAlign: "middle",
  },
  btnContainer: {
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    "@media(max-width:600px)": { flexDirection: "column" },
  },
  receiptAmt: {
    "@media(max-width:600px)": { marginTop: 10 },
  },
});
