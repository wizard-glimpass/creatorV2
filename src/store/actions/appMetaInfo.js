import { CHANGE_FLOOR, REQUEST_PERMISSION } from "../actionTypes";

export const requestPermission = () => ({
  type: REQUEST_PERMISSION,
});

export const changeFloor = (payload) => ({
  type: CHANGE_FLOOR,
  payload,
});
