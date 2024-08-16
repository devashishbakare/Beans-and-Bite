const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = userInfo.userId;
      next();
    } catch (err) {
      return res.status(403).json({
        status_code: 403,
        error: "Un-Authorized request",
      });
    }
  } else {
    return res.status(401).json({ status_code: 401, error: "token missing" });
  }
};

module.exports = authenticate;
