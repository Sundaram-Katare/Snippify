import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header) {
        return res.status(401).json({ message: "Not Authorized" });
    }
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if(!token) {
        return res.status(401).json({ message: "No Token" });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.userId = decoded.userId || decoded.id; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};