import { Request, Response } from 'express';
import { getUploadedData } from '../datastore';

export function searchHandler(request: Request, response: Response) {
  const query = request.query.searchQuery;
  const uploadedData = getUploadedData();
  const filteredData = uploadedData.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(query?.toString().toLowerCase())
    )
  );
  response.json({ data: filteredData });
}
