import express from 'express';

import { createConnectAccount } from '../controllers/stripe';
import { requireLogin } from '../middlewares';

const router = express.Router();

router.post('/create-connect-account', requireLogin, createConnectAccount);

module.exports = router;
