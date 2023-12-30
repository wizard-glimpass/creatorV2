import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actionTypes";

export const showSnackbar = (message, type) => ({
  type: SHOW_SNACKBAR,
  payload: { message, type },
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
