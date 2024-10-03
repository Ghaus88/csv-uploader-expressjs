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
    if (e.target.files) {
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
        <input
          data-testid="file-input"
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button data-testid="upload-btn" type="submit" className="upload-btn">
          Upload CSV
        </button>
      </form>
      <ProgressBar testId="progress-bar" progress={uploadProgress} />
    </div>
  );
};

export default CsvUploader;
