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
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};