const jwt = require('jsonwebtoken');

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Token жоқ" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Рұқсат жоқ" });
            }
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Token қате" });
        }
    };
}

module.exports = { authorizeRoles };
