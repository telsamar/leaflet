import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
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
    // TODO: избавиться от useState
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

        const marker = {
            latitude: props.current_latitude,
            longitude: props.current_longitude,
            icon: selectedIcon
        };
        props.addMarker(marker.latitude, marker.longitude, marker.icon);
        props.resetCoordinates();
    };

    const handleClearMarkers = () => {
        props.clearMarkers();
    };

    const loadIcons = () => {
        API_getIcons((data) => {
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
                    <Form.Control
                        as="select"
                        value={selectedIcon}
                        onChange={(e) => setSelectedIcon(e.target.value)}
                        onFocus={loadIcons}
                    >
                        <option value="">Выберите иконку</option>
                        {icons.map(icon => (
                            <option key={icon.id} value={icon.name}>
                                {icon.name}
                            </option>
                        ))}
                    </Form.Control>
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
