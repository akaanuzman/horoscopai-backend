
import express from "express";
import { RouteConstants } from "../../constants/route.constants";
import { loginUser, registerUser } from "../../controllers/auth/auth.user.controller";
const router = express.Router();

router.post(
    RouteConstants.AUTH.USER.LOGIN,
    loginUser,
);

router.post(
    RouteConstants.AUTH.USER.REGISTER,
    registerUser,
);

export default router;

