import { CHANGE_FLOOR, REQUEST_PERMISSION } from "../actionTypes";
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

    default:
      return state;
  }
};
