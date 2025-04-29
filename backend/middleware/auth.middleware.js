import jwt from "jsonwebtoken";

export const isLogged = async (req, res, next) => {
    try {
        console.log("req.cookies", req.cookies);
        const token = req.cookies.token || "";

        console.log(token ? "Token Found: Yes" : "Token Found: No");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded_token", decoded_token);

        req.user = decoded_token;
    } catch (error) {
        console.error("middleware error", error);
        return res.status(401).json({
            success: false,
            message: "internal server error",
            error: error.message || error
        });
    }
    next();
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied: insufficient permissions"
            });
        }

        next();
    };
};

