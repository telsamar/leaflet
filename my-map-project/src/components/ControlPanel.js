import React, { useState, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";
import {
    act_addMarker,
    act_clearMarkers,
    act_setLatitude,
    act_setLongitude,
    act_resetCoordinates
} from "../store/data/actions";
import { API_getIcons } from '../services/api';

const ControlPanel = (props) => {
    const [icons, setIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState('');

    useEffect(() => {
        loadIcons();
    }, []);

    const handleAddMarker = () => {
        if (!props.current_latitude || !props.current_longitude || !selectedIcon) {
            alert("Поля не должны быть пустыми");
            return;
        }

        props.addMarker(parseFloat(props.current_latitude), parseFloat(props.current_longitude), selectedIcon);
        props.resetCoordinates();
        setSelectedIcon('');
    };

    const handleClearMarkers = () => {
        props.clearMarkers();
    };

    const loadIcons = () => {
        API_getIcons((data) => {
            console.log("Loaded icons:", data);
            setIcons(data);
        });
    };

    return (
        <div className="p-3 border">
            <h4>Управление</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Широта</Form.Label>
                    <Form.Control
                        type="text"
                        value={props.current_latitude}
                        onChange={(e) => props.setLatitude(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Долгота</Form.Label>
                    <Form.Control
                        type="text"
                        value={props.current_longitude}
                        onChange={(e) => props.setLongitude(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Иконка</Form.Label>
                    <div className="icon-list">
                        {icons.map(icon => (
                            <Card
                                key={icon.id}
                                onClick={() => setSelectedIcon(icon.name)}
                                style={{
                                    display: 'inline-block',
                                    margin: '5px',
                                    cursor: 'pointer',
                                    width: '100px',
                                    height: '150px',
                                    border: selectedIcon === icon.name ? '2px solid #007bff' : '1px solid #ddd',
                                    boxShadow: selectedIcon === icon.name ? '0 0 10px rgba(0,123,255,0.5)' : 'none'
                                }}
                            >
                                <Card.Img variant="top" src={icon.icon} style={{ height: '100px', objectFit: 'contain' }} />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '12px', textAlign: 'center' }}>{icon.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
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
        current_latitude: state.current_latitude,
        current_longitude: state.current_longitude
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLatitude: (latitude) => dispatch(act_setLatitude(latitude)),
        setLongitude: (longitude) => dispatch(act_setLongitude(longitude)),
        addMarker: (latitude, longitude, icon) => dispatch(act_addMarker(latitude, longitude, icon)),
        clearMarkers: () => dispatch(act_clearMarkers()),
        resetCoordinates: () => dispatch(act_resetCoordinates())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
