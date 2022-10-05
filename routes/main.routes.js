'use strict';
const router = require('express').Router();
const controllers = require('../controllers');
const prefix = '/';
const { validateCreate } = require('../validators/product');

router.get(
    `${prefix}`,
    controllers.main.index
);

router.post(
    `${prefix}createProduct`,
    validateCreate,
    controllers.main.createProduct,

)
module.exports = router;