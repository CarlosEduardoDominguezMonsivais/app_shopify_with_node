'use strict';
const router = require('express').Router();
const controllers = require('../controllers');
const prefix = '/';

router.get(
    `${prefix}`,
    controllers.main.index
);

router.post(
    `${prefix}save`,
    controllers.main.save
)
module.exports = router;