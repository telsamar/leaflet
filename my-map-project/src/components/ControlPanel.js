import React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { act_addMarker, act_clearMarkers, act_setLatitude, act_setLongitude, act_resetCoordinates } from "../store/data/actions";

const ControlPanel = (props) => {
  const handleAddMarker = () => {
    props.addMarker(props.latitude, props.longitude);
    props.resetCoordinates();
  };

  const handleClearMarkers = () => {
    props.clearMarkers();
  };

  return (
    <div className="p-3 border">
      <h4>Управление</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Широта</Form.Label>
          <Form.Control
            type="text"
            value={props.latitude}
            onChange={(e) => props.setLatitude(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Долгота</Form.Label>
          <Form.Control
            type="text"
            value={props.longitude}
            onChange={(e) => props.setLongitude(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddMarker} className="me-2">
          Метка
        </Button>
        <Button variant="danger" onClick={handleClearMarkers}>
          Очистить метки
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    latitude: state.latitude,
    longitude: state.longitude
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLatitude: (latitude) => dispatch(act_setLatitude(latitude)),
    setLongitude: (longitude) => dispatch(act_setLongitude(longitude)),
    addMarker: (latitude, longitude) => dispatch(act_addMarker(latitude, longitude)),
    clearMarkers: () => dispatch(act_clearMarkers()),
    resetCoordinates: () => dispatch(act_resetCoordinates())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
