const fs = require('fs');
const path = require('path');

const iconsConfigPath = path.join(__dirname, '../iconsConfig.json');

const getIcons = (res) => {
    
}

exports.cntr_icons = async function(req, res) {
    const action = req.query.action;
    switch (action) {
        case 'get': {
            return getIcons(res);
        }
        default: return res.status(400).json({ error: 'action not found' });
    }
}
