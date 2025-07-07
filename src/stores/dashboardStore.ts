import { create } from 'zustand';

export interface DailyNote {
  id: string;
  content: string;
  timestamp: string;
  tableNumber: number;
  customerCount: number;
}

export interface DashboardStats {
  dailyNotes: number;
  weeklyNotes: number;
  dailyPeopleServed: number;
  weeklyPeopleServed: number;
  dailyTablesServed: number;
  weeklyTablesServed: number;
}

export interface WeeklyData {
  day: string;
  notes: number;
  people: number;
  tables: number;
}

interface DashboardState {
  stats: DashboardStats;
  notes: DailyNote[];
  weeklyData: WeeklyData[];
  loading: boolean;
  selectedPeriod: 'day' | 'week';
  fetchDashboardData: () => void;
  setPeriod: (period: 'day' | 'week') => void;
  addNote: (note: Omit<DailyNote, 'id' | 'timestamp'>) => void;
}

// Mock data generator
const generateMockData = () => {
  const today = new Date();
  const notes: DailyNote[] = [];
  
  // Generate daily notes
  for (let i = 0; i < 15; i++) {
    const noteDate = new Date(today);
    noteDate.setHours(8 + Math.floor(Math.random() * 12));
    noteDate.setMinutes(Math.floor(Math.random() * 60));
    
    notes.push({
      id: `note-${i + 1}`,
      content: `Nota de servicio ${i + 1} - Mesa atendida correctamente`,
      timestamp: noteDate.toISOString(),
      tableNumber: Math.floor(Math.random() * 20) + 1,
      customerCount: Math.floor(Math.random() * 6) + 1
    });
  }

  const weeklyData: WeeklyData[] = [
    { day: 'Lun', notes: 45, people: 180, tables: 35 },
    { day: 'Mar', notes: 52, people: 210, tables: 42 },
    { day: 'Mié', notes: 38, people: 165, tables: 28 },
    { day: 'Jue', notes: 61, people: 245, tables: 48 },
    { day: 'Vie', notes: 73, people: 290, tables: 58 },
    { day: 'Sáb', notes: 89, people: 356, tables: 71 },
    { day: 'Dom', notes: 67, people: 268, tables: 53 }
  ];

  const stats: DashboardStats = {
    dailyNotes: notes.filter(note => {
      const noteDate = new Date(note.timestamp);
      return noteDate.toDateString() === today.toDateString();
    }).length,
    weeklyNotes: weeklyData.reduce((sum, day) => sum + day.notes, 0),
    dailyPeopleServed: 156,
    weeklyPeopleServed: weeklyData.reduce((sum, day) => sum + day.people, 0),
    dailyTablesServed: 32,
    weeklyTablesServed: weeklyData.reduce((sum, day) => sum + day.tables, 0)
  };

  return { notes, weeklyData, stats };
};

const mockData = generateMockData();

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  stats: mockData.stats,
  notes: mockData.notes,
  weeklyData: mockData.weeklyData,
  loading: false,
  selectedPeriod: 'day',

  fetchDashboardData: () => {
    set({ loading: true });
    
    // Simulate API call
    setTimeout(() => {
      set({ 
        stats: mockData.stats,
        notes: mockData.notes,
        weeklyData: mockData.weeklyData,
        loading: false 
      });
    }, 500);
  },

  setPeriod: (period) => {
    set({ selectedPeriod: period });
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
        dailyNotes: state.stats.dailyNotes + 1
      }
    }));
  }
}));