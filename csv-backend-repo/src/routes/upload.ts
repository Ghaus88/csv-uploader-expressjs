import { Router } from 'express';
import multer from 'multer';
import { uploadHandler } from '../handlers/upload-handler';
import { searchPaginationHandler } from '../handlers/search-pagination-handler';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadHandler);
router.post('search', searchPaginationHandler);

export default router;
