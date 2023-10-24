import { RESET_NODE_INFO, UPDATE_NODE_INFO } from "../actionTypes";

export const updateNodeInfo = (payload) => ({
  type: UPDATE_NODE_INFO,
  payload,
});

export const resetNodeInfo = () => ({
  type: RESET_NODE_INFO,
});

export const updateTripData = (payload) => ({
  type: `${UPDATE_NODE_INFO}_ADD`,
  payload,
});
