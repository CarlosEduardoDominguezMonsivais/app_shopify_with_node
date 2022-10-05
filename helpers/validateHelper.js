const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    }catch(errors) {
        const validaciones = errors.array()
        res.send({validaciones:validaciones})
    }
}

module.exports = { validateResult }