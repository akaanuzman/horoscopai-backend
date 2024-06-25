import express from "express";
import { RouteConstants } from "../../constants/route.constants";
import { loginAdmin, registerAdmin } from "../../controllers/auth/auth.admin.controller";

const router = express.Router();

router.post(
    RouteConstants.AUTH.ADMIN.LOGIN,
    loginAdmin
);

router.post(
    RouteConstants.AUTH.ADMIN.REGISTER,
    registerAdmin,
);


export default router;