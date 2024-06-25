import { Request, Response } from "express";
import InputHelper from "../../helpers/input/input.helper";
import Admin from "../../models/admin.model";
import { ErrorConstants } from "../../constants/error.constants";
import { StatusCodes } from "../../enums/status.codes";

const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const validationError = InputHelper.validateCompanyLoginInput({ email, password });

        if (validationError != null) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ validationError });
        }

        const admin = await Admin.findOne({ email }).select("+password");

        if (!admin) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: ErrorConstants.auth.invalidEmailOrPassword });
        }

        const isMatch = InputHelper.comparePassword(password, admin.password);
        if (!isMatch) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: ErrorConstants.auth.invalidEmailOrPassword });
        }

        const token = admin.generateJwtFromUser();
        admin.token = token;
        await admin.save();

        res
            .status(StatusCodes.OK)
            .json({ body: admin });

    } catch (error: any) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorConstants.general);
    }
}

/**
 * TODO: Sonradan düzenle
 *  */ 
const registerAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.create(req.body);

        const token = admin.generateJwtFromUser();
        admin.token = token;

        await admin.save();

        return res.status(StatusCodes.CREATED).json({ body: admin });
    } catch (error: any) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorConstants.general);
    }
}

export {
    loginAdmin,
    registerAdmin
}