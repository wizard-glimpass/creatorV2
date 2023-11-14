import { RESET_CONNECTIONS, UPDATE_TRIP_DATA } from "../actionTypes";
import { connectionInfoState } from "../initialState";

export const connectInfoReducer = (state = connectionInfoState, action) => {
  switch (action.type) {
    case `${UPDATE_TRIP_DATA}_SOURCE_NODE`:
      return { ...state, sourceNode: action.payload };
    case `${UPDATE_TRIP_DATA}_DESTINATION_NODE`:
      return { ...state, destinationNode: action.payload };
    case RESET_CONNECTIONS:
      return connectionInfoState;
    default:
      return state;
  }
};
