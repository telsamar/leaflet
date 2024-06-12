import { ADD_MARKER, CLEAR_MARKERS, SET_LATITUDE, SET_LONGITUDE, RESET_COORDINATES, SOCKET_ADD_MARKER, SOCKET_INIT_MARKERS } from "./actions";

const initialState = {
  latitude: "",
  longitude: "",
  markers: JSON.parse(localStorage.getItem("markers")) || [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MARKER:
      return {
        ...state,
        markers: [...state.markers, [parseFloat(action.payload.latitude), parseFloat(action.payload.longitude)]],
      };
    case CLEAR_MARKERS:
      return {
        ...state,
        markers: [],
      };
    case SET_LATITUDE:
      return {
        ...state,
        latitude: action.payload,
      };
    case SET_LONGITUDE:
      return {
        ...state,
        longitude: action.payload,
      };
    case RESET_COORDINATES:
      return {
        ...state,
        latitude: "",
        longitude: "",
      };
    case SOCKET_ADD_MARKER:
      return {
        ...state,
        markers: [...state.markers, action.payload],
      };
    case SOCKET_INIT_MARKERS:
      return {
        ...state,
        markers: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
