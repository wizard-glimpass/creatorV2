import { RESET_NODE_INFO, UPDATE_NODE_INFO } from "../actionTypes";
import { nodeInfoInitialState } from "../initialState";

export const updateNodeInfoReducer = (state = nodeInfoInitialState, action) => {
  switch (action.type) {
    case UPDATE_NODE_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case RESET_NODE_INFO:
      return nodeInfoInitialState;
    default:
      return state;
  }
};
