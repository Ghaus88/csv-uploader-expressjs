import { Request, Response } from 'express';
import { getUploadedData } from '../datastore';
export function getDataHandler(request: Request, response: Response) {
  const page = parseInt(request.query.page as string) || 1;
  const limit = parseInt(request.query.limit as string) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedData = getUploadedData().slice(start, end);

  response.json({
    page,
    totalPages: Math.ceil(getUploadedData().length / limit),
    data: paginatedData,
  });
}
