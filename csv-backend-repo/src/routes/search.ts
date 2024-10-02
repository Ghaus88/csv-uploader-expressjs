import { Router } from 'express';
import { searchHandler } from '../handlers/search-handler';

const router = Router();
router.get('/search', searchHandler);

export default router;
