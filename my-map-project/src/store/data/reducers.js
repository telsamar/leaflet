import { 
  ADD_MARKER, 
  CLEAR_MARKERS, 
  SET_LATITUDE, 
  SET_LONGITUDE, 
  RESET_COORDINATES, 
  SOCKET_ADD_MARKER, 
  SOCKET_INIT_MARKERS, 
  SET_CURRENT_LOCATION,
} from "./actions";

const initialState = {
  latitude: "",
  longitude: "",
  markers: JSON.parse(localStorage.getItem("markers")) || [],
  current_latitude: "",
  current_longitude: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case ADD_MARKER:
          console.log("Reducer ADD_MARKER:", action.payload);
          return {
              ...state,
              markers: [
                  ...state.markers, 
                  [parseFloat(action.payload.latitude), parseFloat(action.payload.longitude), action.payload.icon]
              ],
          };
      case CLEAR_MARKERS:
          return {
              ...state,
              markers: [],
          };
      case SET_LATITUDE:
          return {
              ...state,
              current_latitude: action.payload,
          };
      case SET_LONGITUDE:
          return {
              ...state,
              current_longitude: action.payload,
          };
      case RESET_COORDINATES:
          return {
              ...state,
              current_latitude: "",
              current_longitude: "",
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
      case SET_CURRENT_LOCATION:
          return {
              ...state,
              current_latitude: action.payload.latitude,
              current_longitude: action.payload.longitude,
          };
      default:
          return state;
  }
};

export default reducer;
