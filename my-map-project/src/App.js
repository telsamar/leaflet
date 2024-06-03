import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41], // размер иконки
    iconAnchor: [12, 41], // якорь иконки
    popupAnchor: [1, -34], // якорь для всплывающих окон
    shadowSize: [41, 41] // размер тени
});

L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [markers, setMarkers] = useState([]);

  // Загружаем маркеры из Local Storage
  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
    setMarkers(savedMarkers);
  }, []);

  // Сохраняем маркеры в Local Storage
  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
  }, [markers]);

  const addMarker = () => {
    if (latitude && longitude) {
      const newMarker = [parseFloat(latitude), parseFloat(longitude)];
      setMarkers([...markers, newMarker]);
      setLatitude("");
      setLongitude("");
    }
  };

  // Очистка маркеров из Local Storage
  const clearMarkers = () => {
    localStorage.removeItem("markers");
    setMarkers([]);
  };

  return (
    <Container fluid>
      <Row>
        {/* Левая панель управления */}
        <Col md={3} className="p-3 border">
          <h4>Управление</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Широта</Form.Label>
              <Form.Control
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Долгота</Form.Label>
              <Form.Control
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={addMarker}>
              Метка
            </Button>
            <Button variant="danger" onClick={clearMarkers}>
              Очистить метки
            </Button>
          </Form>
        </Col>

        {/* Правая панель с картой */}
        <Col md={9} className="p-0">
          <MapContainer
            // Центр карты на Москву
            center={[55.7558, 37.6176]}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
          >
            {/* Сама карта */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Показывает все маркеры */}
            {markers.map((marker, idx) => (
              <Marker key={idx} position={marker}></Marker>
            ))}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
