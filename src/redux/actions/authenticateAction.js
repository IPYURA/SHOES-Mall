const manageAuthentication = (boolean) => {
  return (dispatch) => {
    boolean
      ? dispatch({ type: "LOGIN_SUCCESS" })
      : dispatch({ type: "LOGIN_FAIL" });
  };
};
export const authenticateAction = { manageAuthentication };
