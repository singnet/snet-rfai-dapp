import React, { Fragment } from "react";

import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { useStyles } from "./styles";
import { useLocalStorage, localStorageKeys } from "../../common/localStorage";

const withInAppWrapper = InputComponent => {
  return props => {
    const classes = useStyles();

    const onUpdateCloseClick = () => {
      setShowUpdateNotificationBar(false);
    };

    const [showUpdateNotification, setShowUpdateNotificationBar] = useLocalStorage(
      localStorageKeys.showUpdateNotification,
      true
    );

    return (
      <Fragment>
        <Header showNotification={showUpdateNotification} onCloseClick={onUpdateCloseClick} />
        <div className={`${classes.scrollableContent} ${showUpdateNotification ? classes.increaseTopSpace : null}`}>
          <InputComponent {...props} />
          <Footer />
        </div>
      </Fragment>
    );
  };
};

export default withInAppWrapper;
