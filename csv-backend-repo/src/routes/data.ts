import { Router } from 'express';
import { getDataHandler } from '../handlers/data-handler';

const router = Router();
router.get('/data', getDataHandler);

export default router;
