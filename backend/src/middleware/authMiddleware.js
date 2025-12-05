import jwt from "jsonwebtoken";

const ACCESS_SECRET = "sedfsbgfrwegftergfdewrf";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
};
