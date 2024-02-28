import {
  CALIBRATED_SHOP,
  CHANGE_FLOOR,
  GET_ALL_NODES,
  REQUEST_PERMISSION,
} from "../actionTypes";

export const requestPermission = () => ({
  type: REQUEST_PERMISSION,
});

export const changeFloor = payload => ({
  type: CHANGE_FLOOR,
  payload,
});

export const getAllNodesAction = payload => ({
  type: `${GET_ALL_NODES}_SUCCESS`,
  payload,
});

export const setCalibrateShop = payload => ({
  type: `${CALIBRATED_SHOP}`,
  payload,
});
