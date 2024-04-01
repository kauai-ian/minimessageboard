const verifyBody = (req, res, next) => {
    if (!req.body?.username || !req.body?.password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    return next();
  }
  
  module.exports = verifyBody