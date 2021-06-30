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
    title: "AI Marketplace",
    link: "https://beta.singularitynet.io/",
    newTab: true,
  },
  {
    title: "AI Developer",
    link: "https://dev.singularitynet.io/",
    newTab: true,
  },
];

export const NavData = {
  tabs,
};
