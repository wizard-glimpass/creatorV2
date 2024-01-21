import { REMOVE_NODE, RESET_TRIP_INFO, UPDATE_TRIP_DATA } from "../actionTypes";

export const updateTripInfoReducer = (state = [], action) => {
  switch (action.type) {
    case `${UPDATE_TRIP_DATA}_ADD`:
      return [...state, action.payload];
    case `${UPDATE_TRIP_DATA}_REMOVE_NEARBY`:
      const tempState = [...state];
      tempState[action.payload.index] = action.payload.nodeInfo;
      return tempState;

    case REMOVE_NODE:
      const newTripInfo = [...action.payload.tripInfo];
      newTripInfo.splice(action.payload.index, 1);

      return newTripInfo;

    case RESET_TRIP_INFO:
      return [];
    default:
      return state;
  }
};
