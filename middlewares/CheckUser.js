const jwt = require("jsonwebtoken");
const env = require("./../../env.json");
module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      res.json({ msg: "ტოკენი არ არსებობს" });
      next();
    } else {
      const DecodedToken = jwt.verify(token, env.ACCESS_TOKEN);
      req.role = DecodedToken.role;
      next();
    }
  } catch (err) {
    res.json({ msg: "თქვენი სესია ამოიწურა", expired: true });
  }
};
