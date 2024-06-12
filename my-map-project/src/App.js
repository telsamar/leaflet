import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ControlPanel from "./components/ControlPanel";
import MapPanel from "./components/MapPanel";
import { Provider } from "react-redux";
import store from "./store/store";

// TODO: 1) как делать кастомный список в котором каждый элемент - это типа карточка с названием и картинкой
// TODO: 2) как изменять иконку маркера
// TODO: 3) как менять курсор
// TODO: 4) как фиксировать нахождение в режиме ожидания клика на карте
// TODO: 5) как получать координаты клика на карте +
// TODO: 6) как работать с сокетами на сервере +-
// TODO: 7) как обрабатывать сокеты на клиенте +-
// TODO: 8) как лучше всего организовать данную структуру

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