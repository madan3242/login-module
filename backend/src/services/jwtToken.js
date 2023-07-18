const jwt = require('jsonwebtoken');

const createToken = (id) => {
    let payload = {
        id: id
    }
    let options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = createToken