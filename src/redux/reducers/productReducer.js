const initialState = {
  productList: [],
  searchList: [],
  inputText: "",
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_PRODUCT":
      return { ...state, productList: payload.data };
    case "SEARCH_PRODUCT":
      state.inputText = payload.text;
      payload.text === ""
        ? (state.searchList = [])
        : (state.searchList = state.productList.filter((ele) =>
            ele.name.toLowerCase().includes(payload.text.toLowerCase())
          ));
      return { ...state };
    default:
      return { ...state };
  }
};

export default productReducer;
