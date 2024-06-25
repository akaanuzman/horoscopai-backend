import express from "express";
import { RouteConstants } from "../../constants/route.constants";
import admin from "./admin.route";

const router = express.Router();

router.use(RouteConstants.AUTH.ADMIN.BASE, admin);

export default router;