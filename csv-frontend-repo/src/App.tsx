import React, { useEffect, useState } from 'react';
import CsvUploader from './components/csv-uploader/CsvUploader';
import DataTable from './components/table/DataTable';
import Pagination from './components/pagination/Pagination';
import axios from 'axios';
import SearchBar from './components/search/SearchBar.';
import { POST } from './types/types';
const App: React.FC = () => {
  const [data, setData] = useState<POST[]>([]);
  const [page, setPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  //Reset when refresh
  useEffect(() => {
    setSelectedFile(null);
    setUploadProgress(0);
    setData([]);
    setPage(1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/data?page=${page}&limit=10`
        );
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    selectedFile && uploadProgress === 100 && !searchQuery && fetchData();
  }, [page, selectedFile, uploadProgress, searchQuery]);

  const handleFileUpload = async (file: File) => {
    console.log(process.env.REACT_APP_BASE_URL, file);
    if (!file) {
      console.log('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      console.log('Uploading file');
      await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.ceil(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(percentCompleted);
        },
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  const handleSearchQuery = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search?searchQuery=${searchQuery}`
      );
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  return (
    <>
      <h1 style={{ color: '##333333', textAlign: 'center' }}>
        CSV File Uploader
      </h1>
      <CsvUploader
        onUpload={handleFileUpload}
        uploadProgress={uploadProgress}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <SearchBar
        onSearch={handleSearchQuery}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <DataTable data={data} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
};

export default App;
