const manageLikes = (item, isLike) => {
  return (dispatch) => {
    isLike
      ? dispatch({ type: "ADD_LIKES", payload: { item } })
      : dispatch({ type: "DELETE_LIKES", payload: { item } });
  };
};
const deleteAllLikes = () => {
  return (dispatch) => {
    dispatch({ type: "DELETE_ALL_LIKES", payload: { empty: [] } });
  };
};

export const addLikesAction = { manageLikes, deleteAllLikes };
