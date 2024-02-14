const addCart = (cartItem) => {
  return (dispatch) => {
    dispatch({ type: "ADD_CART", payload: { cartItem } });
  };
};
const deleteItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_ITEM", payload: { item } });
  };
};
const deleteAll = () => {
  return (dispatch) => {
    dispatch({ type: "DELETE_ALL" });
  };
};

export const addCartAction = { addCart, deleteItem, deleteAll };
