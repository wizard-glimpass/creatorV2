export const appMetaInfoInitialState = {
  permissionGranted: false,
  currentFloor: "0",
  allNodes: [],
};

export const userMomentInitialState = {
  steps: 0,
  angle: 0,
  resetSteps: false,
};

export const nodeInfoInitialState = {
  floor: null,
  market: "",
  floorDirection: 0,
  shopAngle: null,
  nodeNames: [],
  nodeAltName: [],
  nodeType: null,
};
export const connectionInfoState = {
  sourceNode: null,
  destinationNode: null,
};

export const snackBarInitialState = {
  message: "",
  type: null,
  visible: false,
};
