import {
  ADMIN_UPDATE,
  RESET_NODE_INFO,
  UPDATE_NODE_INFO,
} from "../actionTypes";
import { nodeInfoInitialState } from "../initialState";

export const updateNodeInfoReducer = (state = nodeInfoInitialState, action) => {
  switch (action.type) {
    case UPDATE_NODE_INFO:
      if (action.payload.from === ADMIN_UPDATE) {
        console.log(action.payload);
        delete action.payload.from;
        console.log(action.payload);
        return { ...action.payload };
      }
      return {
        ...state,
        ...action.payload,
      };

    case RESET_NODE_INFO:
      return { ...nodeInfoInitialState, market: state.market };

    default:
      return state;
  }
};
