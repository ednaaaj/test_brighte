'use client'
import { Edit3, Trash } from 'lucide-react'
export type ColumnDefinition<T, K extends keyof T> = {
  key: K
  header: string
  width?: number
}

type TableProps<T extends Record<string, any>> = {
  data: T[]
  columns: ColumnDefinition<T, keyof T>[]
  keyField: keyof T
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  keyField,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No data available</div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-sm shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className="px-4 py-3 text-left text-sm font-bold text-gray-500 uppercase"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-24">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr key={item[keyField]}>
              {columns.map((column) => (
                <td
                  key={`${item[keyField]}-${column.key.toString()}`}
                  className="px-4 py-3 text-sm text-gray-700"
                >
                  {item[column.key]}
                </td>
              ))}
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Edit3 className="text-gray-500" />
                  <Trash className="text-gray-500" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
