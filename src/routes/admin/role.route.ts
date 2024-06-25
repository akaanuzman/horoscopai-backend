import express from "express";
import { RouteConstants } from "../../constants/route.constants";
import { addRole, deleteRole, getRoles } from "../../controllers/admin/role.controller";

const router = express.Router();

router.post(RouteConstants.ADMIN.ROLE.ADD_ROLE, addRole);

router.delete(RouteConstants.ADMIN.ROLE.DELETE_ROLE, deleteRole);

router.get(RouteConstants.ADMIN.ROLE.GET_ROLES, getRoles);

export default router;