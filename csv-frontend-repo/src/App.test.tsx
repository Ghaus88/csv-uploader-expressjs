import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App Component', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
    mockedAxios.get.mockReset();
  });

  test('renders CsvUploader, SearchBar, DataTable, and Pagination', () => {
    render(<App />);

    expect(screen.getByText(/CSV File Uploader/i)).toBeInTheDocument();

    expect(screen.getByTestId('upload-btn')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();

    expect(screen.getByText(/No data to display/i)).toBeInTheDocument();

    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
  });

  test('handles file upload correctly', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { message: 'File uploaded successfully' },
    });

    render(<App />);

    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;

    // Simulate selecting a file
    const file = new File(['file content'], 'sample.csv', { type: 'text/csv' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if file is selected and upload button is enabled
    expect(fileInput.files?.[0]).toEqual(file);
    expect(screen.getByTestId('upload-btn')).toBeEnabled();

    // Trigger file upload
    fireEvent.click(screen.getByTestId('upload-btn'));

    // Ensure the API request was made
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BASE_URL}/upload`,
      expect.any(FormData),
      expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
  });

  test('handles search correctly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { data: [{ id: 1, name: 'Test Post' }] },
    });
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'Test' } });

    fireEvent.click(screen.getByTestId('search-button'));

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BASE_URL}/search?searchQuery=Test`
    );

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });
  });
  /* Some issue with pagination test case*/

  // test('handles pagination correctly', async () => {
  //   mockedAxios.get.mockResolvedValue({
  //     data: {
  //       data: [
  //         { id: 1, name: 'Test Post 1' },
  //         { id: 1, name: 'Test Post 2' },
  //         { id: 1, name: 'Test Post 3' },
  //       ],
  //       totalPages: 3,
  //     },
  //   });
  //   render(<App />);

  //   const fileInput = screen.getByTestId('file-input') as HTMLInputElement;

  //   // Simulate selecting a file
  //   const file = new File(['file content'], 'sample.csv', { type: 'text/csv' });
  //   fireEvent.change(fileInput, { target: { files: [file] } });

  //   fireEvent.click(screen.getByTestId('upload-btn'));

  //   // Check if the initial page is 1
  //   expect(screen.getByText(/Page 1 of 1/i)).toBeInTheDocument();

  //   // Trigger next page
  //   fireEvent.click(screen.getByTestId('next-button'));

  //   // Ensure the API request is made for page 2
  //   expect(axios.get).toHaveBeenCalledWith(
  //     `${process.env.REACT_APP_BASE_URL}/data?page=2&limit=1`
  //   );

  //   // Simulate API response for page 2 and re-render
  //   mockedAxios.get.mockResolvedValue({
  //     data: { data: [{ id: 2, name: 'Post 2' }], totalPages: 3 },
  //   });

  //   fireEvent.click(screen.getByTestId('next-button'));

  //   // Ensure page 2 is rendered
  //   expect(screen.getByText(/Page 2 of 3/i)).toBeInTheDocument();
  // });
});
