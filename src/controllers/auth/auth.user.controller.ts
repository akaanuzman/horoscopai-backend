import { Request, Response } from "express";
import { StatusCodes } from "../../enums/status.codes";
import { ErrorConstants } from "../../constants/error.constants";
import User from "../../models/user.model";
import InputHelper from "../../helpers/input/input.helper";

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const validationError = InputHelper.validateCompanyLoginInput({ email, password });

        if (validationError != null) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ validationError });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: ErrorConstants.auth.invalidEmailOrPassword });
        }

        const isMatch = InputHelper.comparePassword(password, user.password);
        if (!isMatch) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ error: ErrorConstants.auth.invalidEmailOrPassword });
        }

        const token = user.generateJwtFromUser();
        user.token = token;
        await user.save();

        return res
            .status(StatusCodes.OK)
            .json({ body: user });

    } catch (error: any) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorConstants.general);
    }
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);

        const token = user.generateJwtFromUser();
        user.token = token;

        await user.save();

        return res
            .status(StatusCodes.CREATED)
            .json({ body: user });
    } catch (error: any) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorConstants.general);
    }
}

export {
    loginUser,
    registerUser,
}