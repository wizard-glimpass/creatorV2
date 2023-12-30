// snackbarReducer.js
import { snackBarInitialState } from "../initialState";
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actionTypes";

const snackbarReducer = (state = snackBarInitialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return { ...state, ...action.payload, visible: true };
    case HIDE_SNACKBAR:
      return { ...snackBarInitialState };
    default:
      return state;
  }
};

export default snackbarReducer;
