import express from "express";
import role from "./role.route";
import membership from "./membership.route";
import horoscope from "./horoscope.route";
import { RouteConstants } from "../../constants/route.constants";

const router = express.Router();

router.use(RouteConstants.ADMIN.ROLE.BASE, role);

router.use(RouteConstants.ADMIN.MEMBERSHIP.BASE, membership);

router.use(RouteConstants.ADMIN.HOROSCOPE.BASE, horoscope);

export default router;
