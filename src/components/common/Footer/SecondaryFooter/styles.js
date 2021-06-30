import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  secondaryFooter: {
    alignItems: "center",
    "@media (max-width:900px)": { flexFlow: "column-reverse" },
  },
  copyrightText: {
    margin: 0,
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    letterSpacing: -0.1,
    lineHeight: "21px",
    "@media (max-width:1023px) and (min-width:900px)": { width: 353 },
    "@media (max-width:900px)": { textAlign: "center" },
  },
  socialIconsList: {
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "flex-end",
    "& li": {
      "&:first-of-type": {
        "@media (max-width:900px)": { marginLeft: 0 },
      },
    },
    "@media (max-width:900px)": {
      marginBottom: 30,
      justifyContent: "center",
    },
  },
}));
