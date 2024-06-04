import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ControlPanel from "./components/ControlPanel";
import MapPanel from "./components/MapPanel";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Container fluid>
        <Row>
          <Col md={3}>
            <ControlPanel />
          </Col>
          <Col md={9} className="p-0">
            <MapPanel />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
