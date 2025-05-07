import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: "Authorization denied: No token provided or invalid format." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
         return res.status(401).json({ msg: "Authorization denied: Token format seems incorrect." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: "Authorization denied: Token has expired." });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: "Authorization denied: Token is invalid." });
        }
        res.status(401).json({ msg: "Authorization denied: Token verification failed." });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
};
