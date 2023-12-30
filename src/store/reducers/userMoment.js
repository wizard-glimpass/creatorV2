import { USER_MOMENT } from "../actionTypes";
import { userMomentInitialState } from "../initialState";

export const userMomentReducer = (state = userMomentInitialState, action) => {
  switch (action.type) {
    case USER_MOMENT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
