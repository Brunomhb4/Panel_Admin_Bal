import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  subtitle?: string;
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  subtitle,
  searchable = true,
  filterable = false,
  pagination = true,
  pageSize = 10,
  className = ''
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const processedData = React.useMemo(() => {
    let filtered = data;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = pagination 
    ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : processedData;

  return (
    <div className={`
      bg-theme-bg-primary border border-theme-border
      backdrop-blur-md rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)]
      hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      group relative overflow-hidden
      ${className}
    `}>
      {/* Header */}
      {(title || searchable || filterable) && (
        <div className="p-6 border-b border-theme-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && (
                <h3 className="text-theme-text-primary font-bold text-lg mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-theme-text-muted text-sm">
                  {subtitle}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                      pl-10 pr-4 py-2 text-sm
                      bg-theme-bg-secondary border border-theme-border
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent/50
                      text-theme-text-primary placeholder-theme-text-muted
                      transition-all duration-300
                    "
                  />
                </div>
              )}
              
              {filterable && (
                <button className="
                  p-2 bg-theme-bg-secondary border border-theme-border
                  rounded-lg hover:bg-theme-bg-tertiary
                  transition-all duration-300
                ">
                  <Filter className="h-4 w-4 text-theme-text-muted" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-theme-bg-secondary/50 backdrop-blur-sm">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-4 text-left text-xs font-bold text-theme-text-secondary
                    uppercase tracking-wider border-b border-theme-border/30
                    ${column.sortable ? 'cursor-pointer hover:bg-theme-bg-tertiary/50' : ''}
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`h-3 w-3 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-theme-accent' 
                              : 'text-theme-text-muted'
                          }`} 
                        />
                        <ChevronDown 
                          className={`h-3 w-3 -mt-1 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-theme-accent' 
                              : 'text-theme-text-muted'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-theme-border/30">
            {paginatedData.map((row, index) => (
              <tr 
                key={index}
                className="
                  hover:bg-theme-bg-secondary/30 transition-all duration-200
                  group/row
                "
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`
                      px-6 py-4 whitespace-nowrap text-sm text-theme-text-primary
                      ${column.align === 'center' ? 'text-center' : ''}
                      ${column.align === 'right' ? 'text-right' : ''}
                    `}
                  >
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-theme-border/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-theme-text-muted">
              Mostrando {((currentPage - 1) * pageSize) + 1} a {Math.min(currentPage * pageSize, processedData.length)} de {processedData.length} resultados
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="
                  px-3 py-1 text-sm bg-theme-bg-secondary border border-theme-border
                  rounded-lg hover:bg-theme-bg-tertiary disabled:opacity-50
                  transition-all duration-300
                "
              >
                Anterior
              </button>
              
              <span className="px-3 py-1 text-sm text-theme-text-primary">
                {currentPage} de {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="
                  px-3 py-1 text-sm bg-theme-bg-secondary border border-theme-border
                  rounded-lg hover:bg-theme-bg-tertiary disabled:opacity-50
                  transition-all duration-300
                "
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-accent/5 to-theme-highlight/5 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default DataTable;