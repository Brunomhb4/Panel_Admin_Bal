import React from 'react';

interface Checker {
  id: string;
  name: string;
  email: string;
  soldTickets: number;
}

interface CheckersTableProps {
  checkers: Checker[];
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CheckersTable: React.FC<CheckersTableProps> = ({ 
  checkers, 
  showActions = false,
  onEdit,
  onDelete
}) => {
  return (
    <div className="card floating-card">
      <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
        <h3 className="gradient-text font-bold
                       text-base mb-2
                       xs:text-lg xs:mb-2.5
                       sm:text-xl xs:mb-3
                       md:text-2xl md:mb-3">
          Checadores
        </h3>
        <p className="text-sky-muted font-medium
                      text-xs
                      xs:text-sm
                      sm:text-base">
          Personal encargado de la venta de tickets
        </p>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Nombre</th>
              <th className="table-header-cell hidden xs:table-cell">Email</th>
              <th className="table-header-cell">Tickets Vendidos</th>
              {showActions && <th className="table-header-cell">Acciones</th>}
            </tr>
          </thead>
          <tbody className="table-body">
            {checkers.map((checker, index) => (
              <tr 
                key={checker.id} 
                className="table-row animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="table-body-cell">
                  <div className="flex items-center">
                    <div className="text-white font-bold shadow-medium hover:shadow-large transition-all duration-300 hover:scale-110 flex items-center justify-center bg-gradient-to-br from-midnight-blue to-sky-muted
                                    h-8 w-8 rounded-xl text-xs mr-2
                                    xs:h-9 xs:w-9 xs:rounded-2xl xs:text-sm xs:mr-3
                                    sm:h-10 sm:w-10 sm:text-sm sm:mr-4
                                    md:h-12 md:w-12 md:rounded-2xl md:text-base md:mr-5">
                      {checker.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-deep-navy block truncate
                                       text-xs
                                       xs:text-sm
                                       sm:text-base">
                        {checker.name}
                      </span>
                      <span className="text-sky-muted font-medium block truncate xs:hidden
                                       text-xs mt-0.5">
                        {checker.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="table-body-cell text-sky-muted font-medium hidden xs:table-cell
                               text-xs
                               xs:text-sm
                               sm:text-base">
                  {checker.email}
                </td>
                <td className="table-body-cell">
                  <span className="badge badge-secondary font-bold
                                   text-xs
                                   xs:text-xs
                                   sm:text-sm">
                    {checker.soldTickets.toLocaleString()}
                  </span>
                </td>
                {showActions && (
                  <td className="table-body-cell">
                    <div className="flex space-x-2 xs:space-x-3 sm:space-x-4">
                      <button 
                        onClick={() => onEdit && onEdit(checker.id)}
                        className="text-midnight-blue hover:text-deep-navy transition-colors font-semibold hover:scale-105
                                   text-xs
                                   xs:text-sm
                                   sm:text-base"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(checker.id)}
                        className="text-error-600 hover:text-error-900 transition-colors font-semibold hover:scale-105
                                   text-xs
                                   xs:text-sm
                                   sm:text-base"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckersTable;