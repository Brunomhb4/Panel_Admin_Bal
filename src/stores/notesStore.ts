import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyNote {
  id: string;
  content: string;
  timestamp: string;
  tableNumber: number;
  customerCount: number;
  status: 'pending' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

export interface NotesStats {
  dailyNotes: number;
  weeklyNotes: number;
  dailyPeopleServed: number;
  weeklyPeopleServed: number;
  dailyTablesServed: number;
  weeklyTablesServed: number;
  completedNotes: number;
  pendingNotes: number;
}

export interface WeeklyNotesData {
  day: string;
  notes: number;
  people: number;
  tables: number;
  completed: number;
}

interface NotesState {
  notes: DailyNote[];
  stats: NotesStats;
  weeklyData: WeeklyNotesData[];
  loading: boolean;
  selectedPeriod: 'day' | 'week';
  filterStatus: 'all' | 'pending' | 'completed' | 'cancelled';
  fetchNotesData: () => void;
  setPeriod: (period: 'day' | 'week') => void;
  setFilterStatus: (status: 'all' | 'pending' | 'completed' | 'cancelled') => void;
  addNote: (note: Omit<DailyNote, 'id' | 'timestamp'>) => void;
  updateNote: (id: string, data: Partial<DailyNote>) => void;
  deleteNote: (id: string) => void;
}

// Mock data generator for notes
const generateNotesData = () => {
  const today = new Date();
  const notes: DailyNote[] = [];
  
  // Generate daily notes
  for (let i = 0; i < 25; i++) {
    const noteDate = new Date(today);
    noteDate.setHours(8 + Math.floor(Math.random() * 12));
    noteDate.setMinutes(Math.floor(Math.random() * 60));
    
    const statuses: ('pending' | 'completed' | 'cancelled')[] = ['pending', 'completed', 'cancelled'];
    const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    
    notes.push({
      id: `note-${i + 1}`,
      content: `Nota de servicio ${i + 1} - ${['Mesa atendida correctamente', 'Solicitud especial procesada', 'Orden completada', 'Servicio de limpieza', 'Atención al cliente'][Math.floor(Math.random() * 5)]}`,
      timestamp: noteDate.toISOString(),
      tableNumber: Math.floor(Math.random() * 30) + 1,
      customerCount: Math.floor(Math.random() * 8) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignedTo: ['Juan Pérez', 'María López', 'Carlos González', 'Ana Martínez'][Math.floor(Math.random() * 4)]
    });
  }

  const weeklyData: WeeklyNotesData[] = [
    { day: 'Lun', notes: 45, people: 180, tables: 35, completed: 42 },
    { day: 'Mar', notes: 52, people: 210, tables: 42, completed: 48 },
    { day: 'Mié', notes: 38, people: 165, tables: 28, completed: 35 },
    { day: 'Jue', notes: 61, people: 245, tables: 48, completed: 58 },
    { day: 'Vie', notes: 73, people: 290, tables: 58, completed: 69 },
    { day: 'Sáb', notes: 89, people: 356, tables: 71, completed: 84 },
    { day: 'Dom', notes: 67, people: 268, tables: 53, completed: 63 }
  ];

  const completedNotes = notes.filter(note => note.status === 'completed').length;
  const pendingNotes = notes.filter(note => note.status === 'pending').length;

  const stats: NotesStats = {
    dailyNotes: notes.filter(note => {
      const noteDate = new Date(note.timestamp);
      return noteDate.toDateString() === today.toDateString();
    }).length,
    weeklyNotes: weeklyData.reduce((sum, day) => sum + day.notes, 0),
    dailyPeopleServed: 156,
    weeklyPeopleServed: weeklyData.reduce((sum, day) => sum + day.people, 0),
    dailyTablesServed: 32,
    weeklyTablesServed: weeklyData.reduce((sum, day) => sum + day.tables, 0),
    completedNotes,
    pendingNotes
  };

  return { notes, weeklyData, stats };
};

const mockNotesData = generateNotesData();

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: mockNotesData.notes,
      stats: mockNotesData.stats,
      weeklyData: mockNotesData.weeklyData,
      loading: false,
      selectedPeriod: 'day',
      filterStatus: 'all',

      fetchNotesData: () => {
        set({ loading: true });
        
        // Simulate API call
        setTimeout(() => {
          set({ 
            notes: mockNotesData.notes,
            stats: mockNotesData.stats,
            weeklyData: mockNotesData.weeklyData,
            loading: false 
          });
        }, 500);
      },

      setPeriod: (period) => {
        set({ selectedPeriod: period });
      },

      setFilterStatus: (status) => {
        set({ filterStatus: status });
      },

      addNote: (noteData) => {
        const newNote: DailyNote = {
          ...noteData,
          id: `note-${Date.now()}`,
          timestamp: new Date().toISOString()
        };

        set(state => ({
          notes: [newNote, ...state.notes],
          stats: {
            ...state.stats,
            dailyNotes: state.stats.dailyNotes + 1,
            pendingNotes: noteData.status === 'pending' ? state.stats.pendingNotes + 1 : state.stats.pendingNotes
          }
        }));
      },

      updateNote: (id, data) => {
        set(state => ({
          notes: state.notes.map(note => 
            note.id === id ? { ...note, ...data } : note
          )
        }));
      },

      deleteNote: (id) => {
        set(state => ({
          notes: state.notes.filter(note => note.id !== id),
          stats: {
            ...state.stats,
            dailyNotes: state.stats.dailyNotes - 1
          }
        }));
      }
    }),
    {
      name: 'notes-storage'
    }
  )
);