import express from 'express';

import { createConnectAccount, getAccountStatus } from '../controllers/stripe';
import { requireLogin } from '../middlewares';

const router = express.Router();

router.post('/create-connect-account', requireLogin, createConnectAccount);
router.post('/get-account-status', requireLogin, getAccountStatus);

module.exports = router;
