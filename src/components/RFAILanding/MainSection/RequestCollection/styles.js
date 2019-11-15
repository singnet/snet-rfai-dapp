import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  requestCollection: {
    paddingLeft: 25,
    "@media(max-width: 1280px)": { paddingLeft: 0 },
  },
}));
