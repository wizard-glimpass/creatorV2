import { UPDATE_NODE_INFO } from "../actionTypes";

export const updateTripInfoReducer = (state = [], action) => {
  switch (action.type) {
    case `${UPDATE_NODE_INFO}_ADD`:
      return [...state, action.payload];

    default:
      return state;
  }
};
