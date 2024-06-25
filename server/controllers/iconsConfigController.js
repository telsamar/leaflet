const fs = require('fs');
const path = require('path');

const iconsConfigPath = path.join(__dirname, '../iconsConfig.json');

const getIcons = (res) => {
    fs.readFile(iconsConfigPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка прочтения файла с base64:', err);
            return res.status(500).json({ error: 'ошибка сервера' });
        }
        try {
            const icons = JSON.parse(data);
            return res.status(200).json(icons);
        } catch (parseErr) {
            console.error('Ошибка парсинга файла с base64:', parseErr);
            return res.status(500).json({ error: 'ошибка сервера' });
        }
    });
}

exports.cntr_icons = async function(req, res) {
    const action = req.body.action;
    switch (action) {
        case 'get': {
            return getIcons(res);
        }
        default: return res.status(400).json({ error: 'action not found' });
    }
}
