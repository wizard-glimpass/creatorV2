import {
  RESET_NODE_INFO,
  UPDATE_NODE_INFO,
  UPDATE_TRIP_DATA,
  RESET_TRIP_INFO,
} from "../actionTypes";

export const updateNodeInfo = (payload) => ({
  type: UPDATE_NODE_INFO,
  payload,
});

export const resetNodeInfo = () => ({
  type: RESET_NODE_INFO,
});
export const resetTripInfo = () => ({
  type: RESET_TRIP_INFO,
});

export const updateTripDataAdd = (payload) => ({
  type: `${UPDATE_TRIP_DATA}_ADD`,
  payload,
});

export const updateTripDataRemoveNearby = (payload) => ({
  type: `${UPDATE_TRIP_DATA}_REMOVE_NEARBY`,
  payload,
});
