import express from "express";
import { RouteConstants } from "../../constants/route.constants";
import { addMembership, deleteMembership, getMemberships } from "../../controllers/admin/membership.controller";

const router = express.Router();

router.post(RouteConstants.ADMIN.MEMBERSHIP.ADD_MEMBERSHIP, addMembership);

router.delete(RouteConstants.ADMIN.MEMBERSHIP.DELETE_MEMBERSHIP, deleteMembership);

router.get(RouteConstants.ADMIN.MEMBERSHIP.GET_MEMBERSHIPS, getMemberships);

export default router;