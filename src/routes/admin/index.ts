import express from "express";
import role from "./role.route";
import { RouteConstants } from "../../constants/route.constants";

const router = express.Router();

router.use(RouteConstants.ADMIN.ROLE.BASE, role);

export default router;
