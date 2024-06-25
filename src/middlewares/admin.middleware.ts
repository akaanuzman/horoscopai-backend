import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../enums/status.codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "../models/admin.model";

const checkAdminRole = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ error: "You are not authorized to access this route" });
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    if (!jwtSecretKey) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Something went wrong" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.id) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ error: "You are not authorized to access this route" });
        }

        const admin = await Admin.findById(decoded.id);
        if (!admin || !admin.isActive) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ error: "You are not authorized to access this route" });
        }
        next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "You are not authorized to access this route" });
    }
}

export { checkAdminRole }
