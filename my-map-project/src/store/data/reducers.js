import { ADD_MARKER, CLEAR_MARKERS, SET_LATITUDE, SET_LONGITUDE, RESET_COORDINATES } from "./actions";

const initialState = {
  latitude: "",
  longitude: "",
  markers: JSON.parse(localStorage.getItem("markers")) || [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MARKER:
      const newMarkers = [
        ...state.markers,
        [parseFloat(action.payload.latitude), parseFloat(action.payload.longitude)],
      ];
      localStorage.setItem("markers", JSON.stringify(newMarkers));
      return {
        ...state,
        markers: newMarkers,
      };
    case CLEAR_MARKERS:
      localStorage.removeItem("markers");
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
    default:
      return state;
  }
};

export default reducer;
