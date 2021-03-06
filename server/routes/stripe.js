import express from 'express';

import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
} from '../controllers/stripe';
import { requireLogin } from '../middlewares';

const router = express.Router();

router.post('/create-connect-account', requireLogin, createConnectAccount);
router.post('/get-account-status', requireLogin, getAccountStatus);
router.post('/get-account-balance', requireLogin, getAccountBalance);
router.post('/payout-setting', requireLogin, payoutSetting);

module.exports = router;
