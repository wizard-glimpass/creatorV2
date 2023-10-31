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
  market: "test",
  floorDirection: 1,
  shopAngle: null,
  nodeNames: [],
  nodeAltName: [],
  nodeSubtype: null,
};
export const connectionInfoState = {
  sourceNode: null,
  destinationNode: null,
};
