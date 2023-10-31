// rootReducer.js
import { combineReducers } from "redux";
import { appMetaInfoReducer } from "./appMetaInfo";
import { userMomentReducer } from "./userMoment";
import { updateNodeInfoReducer } from "./updateNodeInfo";
import { updateTripInfoReducer } from "./updateTripInfo";
import { connectInfoReducer } from "./connectionInfo";
const rootReducer = combineReducers({
  appMetaInfoReducer: appMetaInfoReducer,
  userMomentReducer: userMomentReducer,
  nodeInfoReducer: updateNodeInfoReducer,
  tripInfoReducer: updateTripInfoReducer,
  connectInfoReducer: connectInfoReducer,
});

export default rootReducer;
