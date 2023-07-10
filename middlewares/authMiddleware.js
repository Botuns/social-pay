const jwt = require('jsonwebtoken');

// authorization by token
const authMiddleware = async (req, res, next) => {
  try {
    let token;
    console.log(token);
    if (req?.headers?.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = {
          id: decoded.id
        };
        next();
      } else {
        throw new Error('Not Authorized');
      }
    } else {
      throw new Error('No token was found in the header');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware };
