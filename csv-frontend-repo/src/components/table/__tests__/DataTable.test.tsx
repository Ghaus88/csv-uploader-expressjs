import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../DataTable';
import { POST } from '../../../types/types';

const mockData: POST[] = [
  {
    postId: '1',
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    body: 'Sample post body',
  },
  {
    postId: '2',
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    body: 'Another post body',
  },
];

describe('DataTable', () => {
  test('renders "No data to display" when data is empty', () => {
    render(<DataTable data={[]} />);
    expect(screen.getByTestId('no-data')).toBeInTheDocument();
  });

  test('renders table headers and rows correctly when data is provided', () => {
    render(<DataTable data={mockData} />);

    const headers = ['postId', 'id', 'name', 'email', 'body'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3); // 3 rows. Includes one header row and 2 data rows.

    // Check the data in the first row
    const firstRowCells = screen.getAllByRole('cell');
    expect(firstRowCells[0].textContent).toBe('1'); //first cell (postId)
    expect(firstRowCells[1].textContent).toBe('1'); // second cell (Id)
    expect(firstRowCells[2].textContent).toBe('John Doe'); //third cell (name)
    expect(firstRowCells[3].textContent).toBe('john@example.com'); //fourth cell (email)
    expect(firstRowCells[4].textContent).toBe('Sample post body'); //fift cell (body)
  });
});
