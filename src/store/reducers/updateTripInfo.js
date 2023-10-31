import { UPDATE_TRIP_DATA } from "../actionTypes";

export const updateTripInfoReducer = (state = [], action) => {
  switch (action.type) {
    case `${UPDATE_TRIP_DATA}_ADD`:
      return [...state, action.payload];
    case `${UPDATE_TRIP_DATA}_REMOVE_NEARBY`:
      const tempState = [...state];
      tempState[action.payload.index] = action.payload.nodeInfo;
      return tempState;
    default:
      return state;
  }
};
