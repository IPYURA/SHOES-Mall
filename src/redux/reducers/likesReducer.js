const initialState = {
  likeList: [],
};

const likesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_LIKES":
      let ArrLength = state.likeList.length;
      ArrLength === 0
        ? state.likeList.push(payload.item)
        : state.likeList.some((ele) => ele.id === payload.item.id)
        ? console.log("같은 항목이 존재함")
        : state.likeList.push(payload.item);
      return { ...state };
    case "DELETE_LIKES":
      const newArr = state.likeList.filter((ele) => ele.id !== payload.item.id);
      state.likeList = newArr;
      return { ...state };
    case "DELETE_ALL_LIKES":
      state.likeList = payload.empty;
      return { ...state };
    default:
      return state;
  }
};

export default likesReducer;
