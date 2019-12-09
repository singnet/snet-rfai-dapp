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
      "&:nth-child(n+3)": {
        "@media(max-width:720px)": { display: "none" },
      },
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
    minHeight: 200,
    position: "relative",
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
    "@media(max-width:1024px)": {
      position: "static",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  showMoreContaienr: {
    minWidth: 65,
    marginLeft: 15,
    display: "none",
    "& > div": { width: "100%" },
    "& label": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 18,
      fontFamily: theme.typography.primary.main,
      transform: "translate(0, 16px) scale(1)",
    },
    "& svg": { top: -2 },
    "@media(max-width:720px)": { display: "block" },
  },
});
