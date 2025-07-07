import React, { useState } from 'react';
import { FileText, Plus, Clock, Users, Coffee, Sparkles, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotesStore, DailyNote } from '../../stores/notesStore';

const NotesTable: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote, stats, filterStatus } = useNotesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<DailyNote | null>(null);
  const [formData, setFormData] = useState({
    content: '',
    tableNumber: 1,
    customerCount: 1,
    status: 'pending' as 'pending' | 'completed' | 'cancelled',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignedTo: ''
  });

  // Filter notes based on selected filter and today's date
  const filteredNotes = notes.filter(note => {
    const noteDate = new Date(note.timestamp);
    const today = new Date();
    const isToday = noteDate.toDateString() === today.toDateString();
    
    if (!isToday) return false;
    
    if (filterStatus === 'all') return true;
    return note.status === filterStatus;
  }).slice(0, 10); // Show only last 10 notes

  const openModal = (note?: DailyNote) => {
    if (note) {
      setEditingNote(note);
      setFormData({
        content: note.content,
        tableNumber: note.tableNumber,
        customerCount: note.customerCount,
        status: note.status,
        priority: note.priority,
        assignedTo: note.assignedTo || ''
      });
    } else {
      setEditingNote(null);
      setFormData({
        content: '',
        tableNumber: 1,
        customerCount: 1,
        status: 'pending',
        priority: 'medium',
        assignedTo: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNote) {
      updateNote(editingNote.id, formData);
    } else {
      addNote(formData);
    }
    
    setFormData({ content: '', tableNumber: 1, customerCount: 1, status: 'pending', priority: 'medium', assignedTo: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      deleteNote(id);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700/40';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700/40';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700/40';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700/40';
    }
  };

  return (
    <div className="card floating-card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6
                      mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-2 xs:mb-2.5 sm:mb-3 md:mb-3">
            <div className="bg-gradient-to-br from-midnight-blue/90 to-navy-blue/90 shadow-[0_0_20px_rgba(27,59,111,0.3)] dark:shadow-[0_0_20px_rgba(193,232,255,0.3)] border-2 border-white/20 dark:border-sky-light/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 group relative overflow-hidden
                            rounded-xl p-2
                            xs:rounded-2xl xs:p-2.5
                            sm:p-3
                            md:rounded-3xl md:p-3.5">
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12 rounded-xl"></div>
              
              <FileText className="text-white relative z-10 drop-shadow-lg transition-all duration-300 group-hover:scale-110
                                  h-4 w-4
                                  xs:h-4 xs:w-4
                                  sm:h-5 sm:w-5
                                  md:h-6 md:w-6" />
            </div>
            
            <h2 className="gradient-text font-bold transition-all duration-300 hover:scale-105 origin-left
                           text-base
                           xs:text-lg
                           sm:text-xl
                           md:text-2xl">
              Notas del Día
            </h2>
            
            <Sparkles className="text-sky-muted dark:text-blue-soft animate-pulse opacity-70
                               h-4 w-4
                               xs:h-5 xs:w-5
                               sm:h-6 sm:w-6" />
          </div>
          
          <p className="text-sky-muted dark:text-blue-soft font-medium transition-all duration-300 hover:text-blue-soft dark:hover:text-sky-light
                        text-xs
                        xs:text-sm
                        sm:text-base">
            Total de notas registradas hoy: <span className="font-bold text-midnight-blue dark:text-sky-light">{stats.dailyNotes}</span>
          </p>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="btn btn-primary inline-flex items-center flex-shrink-0"
        >
          <Plus className="mr-1.5 xs:mr-2 sm:mr-3
                          h-3 w-3
                          xs:h-4 xs:w-4
                          sm:h-4 sm:w-4" />
          <span className="text-xs xs:text-sm sm:text-base">Nueva Nota</span>
        </button>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Estado</th>
              <th className="table-header-cell">Contenido</th>
              <th className="table-header-cell hidden sm:table-cell">Mesa</th>
              <th className="table-header-cell hidden md:table-cell">Personas</th>
              <th className="table-header-cell hidden lg:table-cell">Prioridad</th>
              <th className="table-header-cell hidden lg:table-cell">Asignado</th>
              <th className="table-header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredNotes.length === 0 ? (
              <tr>
                <td colSpan={7} className="table-body-cell text-center py-8 xs:py-10 sm:py-12">
                  <FileText className="mx-auto text-sky-muted dark:text-blue-soft opacity-50
                                      h-8 w-8
                                      xs:h-10 xs:w-10
                                      sm:h-12 sm:w-12
                                      mb-3 xs:mb-4" />
                  <p className="text-sky-muted dark:text-blue-soft font-medium
                                text-sm
                                xs:text-base
                                sm:text-lg">
                    No hay notas registradas hoy
                  </p>
                </td>
              </tr>
            ) : (
              filteredNotes.map((note, index) => (
                <tr 
                  key={note.id}
                  className="table-row animate-slide-up hover:bg-gradient-to-r hover:from-sky-light/10 hover:to-blue-soft/5 dark:hover:from-midnight-blue/10 dark:hover:to-navy-blue/5 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <td className="table-body-cell">
                    <div className="flex items-center">
                      {getStatusIcon(note.status)}
                      <span className="ml-2 capitalize text-xs xs:text-sm font-medium">
                        {note.status === 'pending' ? 'Pendiente' : 
                         note.status === 'completed' ? 'Completada' : 'Cancelada'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="table-body-cell">
                    <div className="max-w-xs">
                      <p className="font-medium text-deep-navy dark:text-sky-light truncate
                                    text-xs
                                    xs:text-sm
                                    sm:text-base">
                        {note.content}
                      </p>
                      <p className="text-sky-muted dark:text-blue-soft
                                    text-xs
                                    xs:text-xs
                                    sm:text-sm">
                        {formatTime(note.timestamp)}
                      </p>
                    </div>
                  </td>
                  
                  <td className="table-body-cell hidden sm:table-cell">
                    <div className="flex items-center text-sky-muted dark:text-blue-soft">
                      <Coffee className="mr-1 xs:mr-1.5
                                        h-3 w-3
                                        xs:h-4 xs:w-4" />
                      <span className="font-semibold
                                       text-xs
                                       xs:text-sm">
                        Mesa {note.tableNumber}
                      </span>
                    </div>
                  </td>
                  
                  <td className="table-body-cell hidden md:table-cell">
                    <div className="flex items-center text-sky-muted dark:text-blue-soft">
                      <Users className="mr-1 xs:mr-1.5
                                        h-3 w-3
                                        xs:h-4 xs:w-4" />
                      <span className="font-semibold
                                       text-xs
                                       xs:text-sm">
                        {note.customerCount}
                      </span>
                    </div>
                  </td>
                  
                  <td className="table-body-cell hidden lg:table-cell">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(note.priority)}`}>
                      {note.priority === 'high' ? 'Alta' : 
                       note.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </td>
                  
                  <td className="table-body-cell hidden lg:table-cell">
                    <span className="text-deep-navy dark:text-sky-light font-medium
                                     text-xs
                                     xs:text-sm">
                      {note.assignedTo || 'Sin asignar'}
                    </span>
                  </td>
                  
                  <td className="table-body-cell">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openModal(note)}
                        className="text-midnight-blue dark:text-sky-light hover:text-deep-navy dark:hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(note.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing notes */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-deep-navy/40 dark:bg-black/60 backdrop-blur-sm" 
              aria-hidden="true"
              onClick={() => setIsModalOpen(false)}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white dark:bg-midnight-blue rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-sky-light/40 dark:border-sky-light/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-midnight-blue px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-deep-navy dark:text-sky-light">
                      {editingNote ? 'Editar Nota' : 'Nueva Nota de Servicio'}
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="content" className="label">Contenido de la nota</label>
                        <textarea
                          name="content"
                          id="content"
                          rows={3}
                          value={formData.content}
                          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                          required
                          className="input resize-none"
                          placeholder="Describe el servicio realizado..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="tableNumber" className="label">Número de Mesa</label>
                          <input
                            type="number"
                            name="tableNumber"
                            id="tableNumber"
                            value={formData.tableNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, tableNumber: Number(e.target.value) }))}
                            min="1"
                            max="100"
                            required
                            className="input"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="customerCount" className="label">Número de Personas</label>
                          <input
                            type="number"
                            name="customerCount"
                            id="customerCount"
                            value={formData.customerCount}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerCount: Number(e.target.value) }))}
                            min="1"
                            max="20"
                            required
                            className="input"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="status" className="label">Estado</label>
                          <select
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'pending' | 'completed' | 'cancelled' }))}
                            className="input"
                          >
                            <option value="pending">Pendiente</option>
                            <option value="completed">Completada</option>
                            <option value="cancelled">Cancelada</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="priority" className="label">Prioridad</label>
                          <select
                            name="priority"
                            id="priority"
                            value={formData.priority}
                            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                            className="input"
                          >
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="assignedTo" className="label">Asignado a</label>
                        <input
                          type="text"
                          name="assignedTo"
                          id="assignedTo"
                          value={formData.assignedTo}
                          onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                          className="input"
                          placeholder="Nombre del empleado"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-sky-light/20 dark:bg-navy-blue/20 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-midnight-blue text-base font-medium text-white hover:bg-navy-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-midnight-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingNote ? 'Actualizar Nota' : 'Guardar Nota'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-sky-muted/40 dark:border-sky-light/20 shadow-sm px-4 py-2 bg-white dark:bg-navy-blue text-base font-medium text-deep-navy dark:text-sky-light hover:bg-sky-light/20 dark:hover:bg-midnight-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-muted sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesTable;