export const initialState = null;

export const reducer = (state, action) => {
  console.log(action.loggedin)
  if (action.type === "USER") {
    return action.loggedin;
  }
  // else {
  //   return action.payload;
  // }

  return {
    ...state
  }
};
