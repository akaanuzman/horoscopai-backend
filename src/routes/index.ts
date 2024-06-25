
import express from 'express';
import auth from "./auth";
import admin from "./admin";
import { RouteConstants } from '../constants/route.constants';
import { checkAdminRole } from '../middlewares/admin.middleware';

const router = express.Router();

router.use(RouteConstants.AUTH.BASE, auth);

router.use(RouteConstants.ADMIN.BASE, checkAdminRole, admin);

export default router;
