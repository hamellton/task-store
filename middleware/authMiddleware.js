const jsonwebtoken = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Не авторизован" });
  }

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Ошибка аутентификации" });
  }
};

module.exports = authenticateUser;
