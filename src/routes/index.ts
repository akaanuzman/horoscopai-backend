
import express from 'express';
import auth from "./auth";
import { RouteConstants } from '../constants/route.constants';

const router = express.Router();

router.use(RouteConstants.AUTH.BASE, auth);

export default router;
