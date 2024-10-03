import React from 'react';
import './dataTable.css';
import { POST } from '../../types/types';
interface DataTableProps {
  data: POST[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <p data-testid="no-data" className="no-data">
        No data to display
      </p>
    );
  }

  // Extract column headers from the first row of the data
  const headers = Object.keys(data[0]);
  console.log('headers', headers);
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => {
                const validHeader: keyof POST = header;
                return <td key={validHeader}>{row[validHeader]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
