export const useStyles = theme => ({
  claimsMainContainer: {
    marginBottom: 30,
    "& h3": {
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
    "& h4": {
      margin: "16px 0",
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      lineHeight: "23px",
    },
  },
  accountBalanceContainer: {
    maxWidth: 411,
    paddingBottom: 27,
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    flexBasis: "30%",
    "@media(max-width:960px)": {
      maxWidth: "100%",
      marginTop: 25,
      marginLeft: 0,
      flexBasis: "100%",
    },
  },
  claimsContainer: {
    marginLeft: 23,
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& > div": {
      padding: "0 22px",
    },
  },
  description: {
    margin: "16px 0 24px",
    color: "#3D3E40",
    fontSize: 16,
    lineHeight: "24px",
  },
  tableHeader: {
    marginBottom: 4,
    "& span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "20px",
    },
  },
  tableData: {
    padding: "9px 0",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.lightGray,
    alignItems: "center",
  },
  centerAlign: { textAlign: "center" },
  claimsForRequest: { marginTop: 8 },
});
