export const UPDATE_FORGOT_PASSWORD_ERROR = "UPDATE_FORGOT_PASSWORD_ERROR";
export const RESET_FORGOT_PASSWORD_ERROR = "RESET_FORGOT_PASSWORD_ERROR";
export const UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR = "UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR";
export const RESET_FORGOT_PASSWORD_SUBMIT_ERROR = "RESET_FORGOT_PASSWORD_SUBMIT_ERROR";
export const UPDATE_PROFILE_SETTINGS_ERROR = "UPDATE_PROFILE_SETTINGS_ERROR";
export const RESET_PROFILE_SETTINGS_ERROR = "RESET_PROFILE_SETTINGS_ERROR";
export const UPDATE_REQUEST_DETAILS_ERROR = "UPDATE_REQUEST_DETAILS_ERROR";
export const RESET_REQUEST_DETAILS_ERROR = "RESET_REQUEST_DETAILS_ERROR";

export const UPDATE_REQUEST_SOLUTIONS_ERROR = "UPDATE_REQUEST_SOLUTIONS_ERROR";
export const RESET_REQUEST_SOLUTIONS_ERROR = "RESET_REQUEST_SOLUTIONS_ERROR";

export const UPDATE_REQUEST_STAKES_ERROR = "UPDATE_REQUEST_STAKES_ERROR";
export const RESET_REQUEST_STAKES_ERROR = "RESET_REQUEST_STAKES_ERROR";

export const updateForgotPasswordError = error => dispatch => {
  dispatch({ type: UPDATE_FORGOT_PASSWORD_ERROR, payload: { forgotPassword: error } });
};

export const resetForgotPasswordError = dispatch => {
  dispatch({ type: RESET_FORGOT_PASSWORD_ERROR, payload: { forgotPassword: undefined } });
};

export const updateForgotPasswordSubmitError = error => dispatch => {
  dispatch({ type: UPDATE_FORGOT_PASSWORD_SUBMIT_ERROR, payload: { forgotPasswordSubmit: error } });
};

export const resetForgotPasswordSubmitError = dispatch => {
  dispatch({ type: RESET_FORGOT_PASSWORD_SUBMIT_ERROR, payload: { forgotPasswordSubmit: undefined } });
};

export const updateProfileSettingsError = error => dispatch => {
  dispatch({ type: UPDATE_PROFILE_SETTINGS_ERROR, payload: { profileSettings: error } });
};

export const resetProfileSettingsError = dispatch => {
  dispatch({ type: RESET_PROFILE_SETTINGS_ERROR, payload: { profileSettings: undefined } });
};

export const updateRequestDetailsError = error => dispatch => {
  dispatch({ type: UPDATE_REQUEST_DETAILS_ERROR, payload: { requestDetails: error } });
};

export const resetRequestDetailsError = dispatch => {
  dispatch({ type: RESET_REQUEST_DETAILS_ERROR, payload: { requestDetails: undefined } });
};

export const updateRequestSolutionsError = error => dispatch => {
  dispatch({ type: UPDATE_REQUEST_SOLUTIONS_ERROR, payload: { requestSolutions: error } });
};

export const resetRequestSolutionsError = dispatch => {
  dispatch({ type: RESET_REQUEST_SOLUTIONS_ERROR, payload: { requestSolutions: undefined } });
};

export const updateRequestStakesError = error => dispatch => {
  dispatch({ type: UPDATE_REQUEST_STAKES_ERROR, payload: { requestStakes: error } });
};

export const resetRequestStakesError = dispatch => {
  dispatch({ type: RESET_REQUEST_STAKES_ERROR, payload: { requestStakes: undefined } });
};
