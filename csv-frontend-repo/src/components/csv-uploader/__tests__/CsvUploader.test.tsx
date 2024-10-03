import { render, screen, fireEvent } from '@testing-library/react';
import CsvUploader from '../CsvUploader';

describe('CsvUploader Component', () => {
  const mockHandleFileUpload = jest.fn();
  const mockSetSelectedFile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const uploadProgress = 50;
    const selectedFile = null;

    render(
      <CsvUploader
        onUpload={mockHandleFileUpload}
        uploadProgress={uploadProgress}
        selectedFile={selectedFile}
        setSelectedFile={mockSetSelectedFile}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeInTheDocument();

    expect(screen.getByTestId('upload-btn')).toBeInTheDocument();

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  test('handles file selection', () => {
    const uploadProgress = 0;
    const selectedFile = null;

    render(
      <CsvUploader
        onUpload={mockHandleFileUpload}
        uploadProgress={uploadProgress}
        selectedFile={selectedFile}
        setSelectedFile={mockSetSelectedFile}
      />
    );

    const fileInput = screen.getByTestId('file-input');
    const testFile = new File(['test content'], 'test.csv', {
      type: 'text/csv',
    });

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(mockSetSelectedFile).toHaveBeenCalledWith(testFile);
  });

  test('calls onUpload with the selected file on form submit', () => {
    const uploadProgress = 0;
    const selectedFile = new File(['test content'], 'test.csv', {
      type: 'text/csv',
    });

    render(
      <CsvUploader
        onUpload={mockHandleFileUpload}
        uploadProgress={uploadProgress}
        selectedFile={selectedFile}
        setSelectedFile={mockSetSelectedFile}
      />
    );

    const uploadButton = screen.getByTestId('upload-btn');
    fireEvent.click(uploadButton);

    expect(mockHandleFileUpload).toHaveBeenCalledWith(selectedFile);
  });

  test('alerts when no file is selected on form submit', () => {
    const uploadProgress = 0;
    const selectedFile = null;

    render(
      <CsvUploader
        onUpload={mockHandleFileUpload}
        uploadProgress={uploadProgress}
        selectedFile={selectedFile}
        setSelectedFile={mockSetSelectedFile}
      />
    );

    const uploadButton = screen.getByTestId('upload-btn');

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(uploadButton);

    expect(window.alert).toHaveBeenCalledWith('Please select a file');
  });
});
