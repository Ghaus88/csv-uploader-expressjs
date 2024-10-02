// dataStore.ts
interface IUploadedData {
  id: string;
  name: string;
  email: string;
  body: string;
}
let uploadedData: IUploadedData[] = [];

export const getUploadedData = () => uploadedData;
export const setUploadedData = (newData: IUploadedData[]) => {
  uploadedData = newData;
};
