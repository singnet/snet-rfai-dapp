export const useStyles = theme => ({
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.text.verticalTabLeftBorder,
    marginBottom: 16,
    position: "relative",
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
  checkboxContainer: {
    position: "absolute",
    right: 0,
    "& label": { marginRight: 0 },
    "& .Mui-checked": { color: theme.palette.text.primary },
    "& .MuiTypography-body1": {
      color: theme.palette.text.mediumShadeGray,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      letterSpacing: 0.25,
    },
  },
});
