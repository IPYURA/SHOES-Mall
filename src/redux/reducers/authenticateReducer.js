const initialState = {
  authentication: false,
};

const authenticateReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      state.authentication = true;
      return { ...state };
    case "LOGIN_FAIL":
      state.authentication = false;
      return { ...state };
    default:
      return { ...state };
  }
};

export default authenticateReducer;
