const initialState = {
  cartList: [],
  totalPrice: 0,
};

const addCartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_CART":
      state.cartList.push(payload.cartItem);
      state.totalPrice = state.cartList.reduce(
        (acc, cur) => acc + cur.price,
        0
      );
      return { ...state };
    case "DELETE_ITEM":
      let newArr = [];
      newArr = state.cartList.filter((ele) => ele.id !== payload.item.id);
      state.cartList = newArr;
      state.totalPrice = state.cartList.reduce(
        (acc, cur) => acc + cur.price,
        0
      );
      return { ...state };
    case "DELETE_ALL":
      state.cartList = [];
      state.totalPrice = 0;
      return { ...state };
    default:
      return state;
  }
};

export default addCartReducer;
