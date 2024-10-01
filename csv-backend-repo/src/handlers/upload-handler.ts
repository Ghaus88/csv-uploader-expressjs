import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
let uploadedData: any[] = [];
export function uploadHandler(request: Request, response: Response) {
  // if (!request.file) {
  //   response.status(400).json({ message: 'No file uploaded' });
  // }
  const filePath = path.join(process.cwd(), request.file?.path || '');
  const results: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      uploadedData = results; // Store CSV data in memory
      fs.unlinkSync(filePath); // Remove file after reading
      response
        .status(200)
        .json({ message: 'File uploaded successfully', total: results.length });
    });
}
