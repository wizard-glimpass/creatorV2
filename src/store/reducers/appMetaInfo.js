import { REQUEST_PERMISSION } from "../actionTypes";
import { appMetaInfoInitialState } from "../initialState";

export const appMetaInfoReducer = (state = appMetaInfoInitialState, action) => {
  switch (action.type) {
    case REQUEST_PERMISSION:
      return {
        ...state,
        permissionGranted: true,
      };

    default:
      return state;
  }
};
