export const ADD_MARKER = "ADD_MARKER";
export const CLEAR_MARKERS = "CLEAR_MARKERS";
export const SET_LATITUDE = "SET_LATITUDE";
export const SET_LONGITUDE = "SET_LONGITUDE";
export const RESET_COORDINATES = "RESET_COORDINATES";
export const SOCKET_ADD_MARKER = "SOCKET_ADD_MARKER";
export const SOCKET_INIT_MARKERS = "SOCKET_INIT_MARKERS";
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";

export const act_addMarker = (latitude, longitude) => ({
  type: ADD_MARKER,
  payload: { latitude, longitude },
});

export const act_clearMarkers = () => ({
  type: CLEAR_MARKERS,
});

export const act_setLatitude = (latitude) => ({
  type: SET_LATITUDE,
  payload: latitude,
});

export const act_setLongitude = (longitude) => ({
  type: SET_LONGITUDE,
  payload: longitude,
});

export const act_resetCoordinates = () => ({
  type: RESET_COORDINATES,
});

export const socketAddMarker = (marker) => ({
  type: SOCKET_ADD_MARKER,
  payload: marker,
});

export const socketInitMarkers = (markers) => ({
  type: SOCKET_INIT_MARKERS,
  payload: markers,
});

export const setCurrentLocation = (latitude, longitude) => ({
  type: SET_CURRENT_LOCATION,
  payload: { latitude, longitude },
});
