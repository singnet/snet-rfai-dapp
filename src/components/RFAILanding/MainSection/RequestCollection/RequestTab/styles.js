export const useStyles = theme => ({
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.verticalTabLeftBorder,
    marginBottom: 16,
    backgroundColor: "transparent",
    boxShadow: "none",
    "& button": {
      color: theme.palette.text.lightShadedGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 18,
      textTransform: "capitalize",
      lineHeight: "23px",
    },
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: "bold",
    },
    "& .PrivateTabIndicator-colorPrimary-289": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  requestTabDetailContainer: {
    "& .MuiExpansionPanel-root": { marginBottom: 10 },
    "& .MuiPaper-elevation1": { boxShadow: "none" },
  },
});
