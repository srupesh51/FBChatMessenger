const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userData = {
         email: decodedToken.email,
         name: decodedToken.name,
         user_id: decodedToken.user_id
      }
      next();
   } catch (error) {
        res.status(401).json({
            message: 'You are not authorized to access this request!! Invalid request'
        });
    }
}
