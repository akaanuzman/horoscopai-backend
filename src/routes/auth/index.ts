import express from "express";
import { RouteConstants } from "../../constants/route.constants";
import admin from "./admin.route";
import user from "./user.route";

const router = express.Router();

router.use(RouteConstants.AUTH.ADMIN.BASE, admin);

router.use(RouteConstants.AUTH.USER.BASE, user);

export default router;