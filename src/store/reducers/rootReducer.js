// rootReducer.js
import { combineReducers } from "redux";
import { appMetaInfoReducer } from "./appMetaInfo";
import { userMomentReducer } from "./userMoment";
import { updateNodeInfoReducer } from "./updateNodeInfo";
import { updateTripInfoReducer } from "./updateTripInfo";
import { connectInfoReducer } from "./connectionInfo";
import snackbarReducer from "./snackBar";
const rootReducer = combineReducers({
  appMetaInfoReducer: appMetaInfoReducer,
  userMomentReducer: userMomentReducer,
  nodeInfoReducer: updateNodeInfoReducer,
  tripInfoReducer: updateTripInfoReducer,
  connectInfoReducer: connectInfoReducer,
  snackBar: snackbarReducer,
});

export default rootReducer;
