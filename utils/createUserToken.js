const jwt = require('jsonwebtoken')

const createUserToken = async(user, message, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.JWT_SECRET)
    res.json({
        message,
        token,
        user,
        userId: user.id
    })
}

module.exports = createUserToken