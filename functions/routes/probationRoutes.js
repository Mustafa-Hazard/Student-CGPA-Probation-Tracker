import express from 'express';
import { getProbationData, getFilters } from '../controllers/probationController.js';

const router = express.Router();

router.get('/probation', getProbationData);
router.get('/filters', getFilters);

export default router;