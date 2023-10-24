import {
  CHANGE_FLOOR,
  GET_ALL_NODES,
  REQUEST_PERMISSION,
} from "../actionTypes";
import { appMetaInfoInitialState } from "../initialState";

export const appMetaInfoReducer = (state = appMetaInfoInitialState, action) => {
  switch (action.type) {
    case REQUEST_PERMISSION:
      return {
        ...state,
        permissionGranted: true,
      };
    case CHANGE_FLOOR:
      return {
        ...state,
        currentFloor: action.payload,
      };
    case `${GET_ALL_NODES}_SUCCESS`:
      return {
        ...state,
        allNodes: action.payload,
      };

    default:
      return state;
  }
};
