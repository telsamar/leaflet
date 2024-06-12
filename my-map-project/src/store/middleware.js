import { ADD_MARKER, CLEAR_MARKERS, SOCKET_ADD_MARKER, SOCKET_INIT_MARKERS } from "./data/actions";

const saveMarkersToLocalStorage = store => next => action => {
  const result = next(action);

  if ([ADD_MARKER, SOCKET_ADD_MARKER, SOCKET_INIT_MARKERS].includes(action.type)) {
    const markers = store.getState().markers;
    localStorage.setItem("markers", JSON.stringify(markers));
  }

  if (action.type === CLEAR_MARKERS) {
    localStorage.removeItem("markers");
  }

  return result;
};

export default saveMarkersToLocalStorage;
