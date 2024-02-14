const getProduct = (searchquery) => {
  return async (dispatch) => {
    const url = `https://raw.githubusercontent.com/IPYURA/shopping-mall-data1/main/product.json?q=${searchquery}`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: "GET_PRODUCT", payload: { data } });
  };
};
const searchProduct = (text) => {
  return (dispatch) => {
    dispatch({ type: "SEARCH_PRODUCT", payload: { text } });
  };
};

export const productAction = { getProduct, searchProduct };
