const jwt = require("jsonwebtoken");

const mysqlClient = require("../config/db/databaseConnection");
const JWT_SECRET = process.env.JWT_SECRET;
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    // Check if token exists in the database blacklist
    const query = `SELECT * FROM auth_user.expired_token WHERE token = '${token}'`;

    const result = await new Promise((resolve, reject) => {
      mysqlClient.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    if (result.length > 0) {
      return res.status(401).json({ message: "Invalid token not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
