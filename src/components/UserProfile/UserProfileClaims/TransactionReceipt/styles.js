export const useStyles = theme => ({
  card: {
    width: 640,
    margin: "0 auto",
  },
  CardHeader: {
    padding: 0,
    "& span": {
      padding: "0 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "50px",
    },
  },
  CardContent: { padding: 0 },
  summaryMainContainer: {
    paddingBottom: 40,
    "& p": {
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  transactionReceiptMainContainer: {
    width: 555,
    margin: "40px 50px 25px",
    "& h4": {
      margin: "0 0 16px",
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
  transactionReceiptTitleContainer: {
    padding: "16px 22px",
    backgroundColor: theme.palette.text.cardBackground,
    "& div": { display: "flex" },
    "& p": {
      paddingLeft: 10,
      margin: 0,
    },
  },
  transactionReceiptContainer: {
    padding: "0 22px",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.text.cardBackground,
    "& > div": {
      width: "100%",
      padding: "19px 0",
      display: "flex",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.lightGray,
      "&:last-of-type": { border: "none" },
    },
  },
  succesMsgBox: {
    paddingTop: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoIcon: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 18,
    marginRight: 9,
    verticalAlign: "middle",
  },
  btnContainer: {
    padding: 0,
    marginBottom: 32,
    display: "flex",
    justifyContent: "center",
    "@media(max-width:600px)": { flexDirection: "column" },
  },
  receiptAmt: {
    "@media(max-width:600px)": { marginTop: 10 },
  },
});
