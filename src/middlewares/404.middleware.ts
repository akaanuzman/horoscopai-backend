import { StatusCodes } from "../enums/status.codes";
import { Request, Response } from "express";

// This middleware is used to handle the 404 errors.
export const notFoundMiddleware = (req: Request, res: Response) => {
    res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "This page doesn't exist." })
}