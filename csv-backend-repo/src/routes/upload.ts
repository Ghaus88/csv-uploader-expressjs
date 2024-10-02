import { Router } from 'express';
import multer from 'multer';
import { uploadHandler } from '../handlers/upload-handler';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadHandler);

export default router;
