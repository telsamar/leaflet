const express = require('express');
const textController = require('../controllers/textController.js');
const messageController = require('../controllers/messageController.js');
const iconsConfigController = require('../controllers/iconsConfigController.js');

const workRouter = express.Router();

workRouter.post('/text', textController.cntr_text);
workRouter.post('/message', messageController.cntr_message);
workRouter.post('/icons', iconsConfigController.cntr_icons);

module.exports = workRouter;
