import { UPDATE_TRIP_DATA } from "../actionTypes";

export const updateCurrentSource = (currentSource) => ({
  type: `${UPDATE_TRIP_DATA}_SOURCE_NODE`,
  payload: currentSource,
});
export const updateDestinationNode = (destinationNode) => ({
  type: `${UPDATE_TRIP_DATA}_DESTINATION_NODE`,
  payload: destinationNode,
});
