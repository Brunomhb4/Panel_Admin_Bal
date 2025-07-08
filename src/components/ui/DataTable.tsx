import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

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
  emptyMessage?: string;
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
  className = '',
  emptyMessage = 'No hay datos disponibles'
}) => {
  const { mode } = useThemeStore();
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
      backdrop-blur-md rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)]
      hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      group relative overflow-hidden border-2
      ${mode === 'dark' 
        ? 'bg-theme-bg-primary border-theme-border' 
        : 'bg-white/90 border-gray-200'
      }
      ${className}
    `}>
      {/* Header */}
      {(title || searchable || filterable) && (
        <div className={`p-6 border-b
                        ${mode === 'dark' ? 'border-theme-border/50' : 'border-gray-200/50'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && (
                <h3 className={`font-bold text-lg mb-1
                               ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-sm
                              ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-600'}`}>
                  {subtitle}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {searchable && (
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4
                                     ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`
                      pl-10 pr-4 py-2 text-sm rounded-lg border-2 transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${mode === 'dark' 
                        ? 'bg-theme-bg-secondary border-theme-border text-theme-text-primary placeholder-theme-text-muted focus:ring-theme-accent/50 focus:border-theme-accent' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/50 focus:border-blue-500'
                      }
                    `}
                  />
                </div>
              )}
              
              {filterable && (
                <button className={`
                  p-2 rounded-lg border-2 transition-all duration-300
                  ${mode === 'dark' 
                    ? 'bg-theme-bg-secondary border-theme-border hover:bg-theme-bg-tertiary' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                  }
                `}>
                  <Filter className={`h-4 w-4
                                     ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-400'}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`
            backdrop-blur-sm
            ${mode === 'dark' ? 'bg-theme-bg-secondary/50' : 'bg-gray-50/50'}
          `}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-4 text-left text-xs font-bold uppercase tracking-wider
                    border-b transition-all duration-300
                    ${mode === 'dark' 
                      ? 'text-theme-text-secondary border-theme-border/30' 
                      : 'text-gray-600 border-gray-200/30'
                    }
                    ${column.sortable ? 'cursor-pointer hover:bg-opacity-75' : ''}
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
                              ? mode === 'dark' ? 'text-theme-accent' : 'text-blue-600'
                              : mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-400'
                          }`} 
                        />
                        <ChevronDown 
                          className={`h-3 w-3 -mt-1 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? mode === 'dark' ? 'text-theme-accent' : 'text-blue-600'
                              : mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-400'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y
                            ${mode === 'dark' ? 'divide-theme-border/30' : 'divide-gray-200/30'}`}>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center">
                  <p className={`text-sm
                                ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-500'}`}>
                    {emptyMessage}
                  </p>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr 
                  key={index}
                  className={`
                    transition-all duration-200 group/row
                    ${mode === 'dark' 
                      ? 'hover:bg-theme-bg-secondary/30' 
                      : 'hover:bg-gray-50/50'
                    }
                  `}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        px-6 py-4 whitespace-nowrap text-sm
                        ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className={`px-6 py-4 border-t
                        ${mode === 'dark' ? 'border-theme-border/50' : 'border-gray-200/50'}`}>
          <div className="flex items-center justify-between">
            <div className={`text-sm
                            ${mode === 'dark' ? 'text-theme-text-muted' : 'text-gray-600'}`}>
              Mostrando {((currentPage - 1) * pageSize) + 1} a {Math.min(currentPage * pageSize, processedData.length)} de {processedData.length} resultados
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`
                  px-3 py-1 text-sm rounded-lg border-2 transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${mode === 'dark' 
                    ? 'bg-theme-bg-secondary border-theme-border hover:bg-theme-bg-tertiary text-theme-text-primary' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
                  }
                `}
              >
                Anterior
              </button>
              
              <span className={`px-3 py-1 text-sm
                               ${mode === 'dark' ? 'text-theme-text-primary' : 'text-gray-900'}`}>
                {currentPage} de {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`
                  px-3 py-1 text-sm rounded-lg border-2 transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${mode === 'dark' 
                    ? 'bg-theme-bg-secondary border-theme-border hover:bg-theme-bg-tertiary text-theme-text-primary' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
                  }
                `}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className={`absolute inset-0 rounded-xl animate-pulse
                        ${mode === 'dark' 
                          ? 'bg-gradient-to-r from-theme-accent/5 to-theme-highlight/5' 
                          : 'bg-gradient-to-r from-blue-500/5 to-indigo-500/5'
                        }`}></div>
      </div>
    </div>
  );
};

export default DataTable;