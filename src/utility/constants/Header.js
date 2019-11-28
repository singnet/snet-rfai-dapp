import Routes from "./Routes";

export const headerData = {
  SIGNUP: {
    headerTitle: "Already have an account?",
    linkPath: Routes.LOGIN,
    headerText: "Login",
  },
  LOGIN: {
    headerTitle: "New to singularityNET?",
    linkPath: Routes.SIGNUP,
    headerText: "Sign Up",
  },
  FORGOT_PASSWORD: {
    headerTitle: "Switch to another account?",
    linkPath: Routes.LOGIN,
    headerText: "Login",
  },
  FORGOT_PASSWORD_SUBMIT: {
    headerTitle: "",
    linkPath: Routes.SIGNUP,
    headerText: "",
  },
  ONBOARDING: {
    headerTitle: "",
    linkPath: Routes.SIGNUP,
    headerText: "Log Out",
  },
};

const tabs = [
  {
    title: "View Requests",
    link: `/${Routes.RFAI_LANDING}`,
    newTab: false,
  },
  {
    title: "Create Request",
    link: `/${Routes.CREATE_REQUEST}`,
    newTab: false,
  },
  {
    title: "Get Started",
    link: `/${Routes.GET_STARTED}`,
    newTab: false,
  },
  {
    title: "Claims",
    link: `/${Routes.USER_PROFILE}/claims`,
    newTab: false,
  },
];

export const NavData = {
  tabs,
};
