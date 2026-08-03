import React from 'react';
import { Button } from '../common/button';

export const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3">{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th className="px-6 py-3 text-right">Aksi</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-600">
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right space-x-2">
                    {onEdit && (
                      <Button variant="secondary" onClick={() => onEdit(row)}>
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="danger" onClick={() => onDelete(row.id)}>
                        Hapus
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)}
                className="px-6 py-4 text-center text-gray-400"
              >
                Tidak ada data tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};