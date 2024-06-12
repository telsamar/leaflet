const fs = require('fs');

exports.settings = require('../settings/settings.json'); 






const getText = (res) => {
    // get data from db
    return res.status(200).json({success: 'text from server'});
}

const insertText = (req, res) => {
    const text = req.body.text
    console.log('get text: ',text)
    // save to db
    return res.status(200).json({success: 'text saved'});
}

const getForId = (res) => {
    // get data from db.js =>  getMessagesForId
    return res.status(200).json({success: 'text from server'});
}



exports.cntr_text = async function(req, res) {
    const action = req.body.action;
    switch (action) {
        case 'get': {
            return getText(res)
        }
        case 'insert': {
            return insertText(req, res)
        }
        case 'getForId': {
            return getForId(req, res)
        }

        default: return res.status(400).json({error: 'action not found'})
    }
}