const jwt = require('jsonwebtoken');

//token verification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const key = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
    const decoded = jwt.verify(
      token,
      key,
      {
        expiresIn: '1h',
        algorithm: ["RS256"]
      }
    );
    res.locals.userData = decoded;
    res.locals.isAuthenticated = true;
    next();
  } catch (error) {
    res.locals.isAuthenticated = false;
    next();
  }
};
