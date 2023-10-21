// rootReducer.js
import { combineReducers } from "redux";
import { appMetaInfoReducer } from "./appMetaInfo";
import { userMomentReducer } from "./userMoment";
const rootReducer = combineReducers({
  appMetaInfoReducer: appMetaInfoReducer,
  userMomentReducer: userMomentReducer,
});

export default rootReducer;
