import './csv-uploader.css';
import ProgressBar from '../progress-bar/ProgressBar';
const CsvUploader = ({
  onUpload,
  uploadProgress,
  selectedFile,
  setSelectedFile,
}: {
  onUpload: (file: File) => void;
  uploadProgress: number;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Inside here 1', e.target);
    if (e.target.files) {
      console.log('Inside here 2');
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
    } else {
      alert('Please select a file');
    }
  };

  return (
    <div className="csv-uploader">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="upload-btn">
          Upload CSV
        </button>
      </form>
      <ProgressBar progress={uploadProgress} />
    </div>
  );
};

export default CsvUploader;
