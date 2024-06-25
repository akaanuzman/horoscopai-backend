import express from 'express';
import { RouteConstants } from '../../constants/route.constants';
import { addHoroscope, addHoroscopesScript, deleteHoroscope, getHoroscopes } from '../../controllers/admin/horoscope.controller';

const router = express.Router();

router.post(RouteConstants.ADMIN.HOROSCOPE.ADD_HOROSCOPE, addHoroscope);

router.get(RouteConstants.ADMIN.HOROSCOPE.ADD_HOROSCOPES_SCRIPT, addHoroscopesScript);

router.delete(RouteConstants.ADMIN.HOROSCOPE.DELETE_HOROSCOPE, deleteHoroscope);

router.get(RouteConstants.ADMIN.HOROSCOPE.GET_HOROSCOPES, getHoroscopes);

export default router;