import store from '../store/store';

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'cors',
};

export const commonAPI = (api, action, body = {}, dispatcher = null, api_request = null) => {
    fetch(`http://localhost:3030/api/${api}`, {
        ...options,
        body: JSON.stringify({ action, ...body })
    })
        .then(response => response.json())
        .then(data => {
            if (dispatcher) {
                store.dispatch(dispatcher(data.success));
            }
            if (api_request) {
                api_request(data);
            }
        })
        .catch(error => console.error('API error:', error));
};

// получение всех иконок
export const API_getIcons = (callback) => {
    commonAPI('icons', 'get', {}, null, callback);
};
