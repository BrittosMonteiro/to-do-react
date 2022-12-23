let initialState = {
  id: "",
  isLogged: false,
  token: "",
  username: "",
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("userSession", JSON.stringify(action.payload));
      return (state = action.payload);
    case "REMOVE_USER":
      localStorage.removeItem("userSession");
      return (state = initialState);
    default:
      return state;
  }
}
