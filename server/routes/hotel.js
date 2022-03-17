import express from 'express';
import formidable from 'express-formidable';

import { createHotel } from '../controllers/hotel';
import { requireLogin } from '../middlewares';

const router = express.Router();

router.post('/create-hotel', requireLogin, formidable(), createHotel);

module.exports = router;
