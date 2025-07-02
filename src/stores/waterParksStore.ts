import { create } from 'zustand';

export interface WaterPark {
  id: string;
  name: string;
  activeTickets: number;
  soldTickets: number;
  printedTickets: number;
  inactiveTickets: number;
  totalRevenue: number;
}

interface Checker {
  id: string;
  name: string;
  email: string;
  waterParkId: string;
  soldTickets: number;
}

export interface DailyStats {
  date: string;
  tickets: number;
  revenue: number;
}

export interface MonthlyStats {
  month: string;
  tickets: number;
  revenue: number;
}

interface WaterParksState {
  waterParks: WaterPark[];
  checkers: Checker[];
  dailyStats: Record<string, DailyStats[]>;
  monthlyStats: Record<string, MonthlyStats[]>;
  loading: boolean;
  error: string | null;
  fetchWaterParks: () => void;
  fetchWaterParkDetails: (id: string) => WaterPark | undefined;
  fetchCheckers: (waterParkId: string) => Checker[];
  fetchDailyStats: (waterParkId: string) => DailyStats[];
  fetchMonthlyStats: (waterParkId: string) => MonthlyStats[];
  addWaterPark: (waterPark: Omit<WaterPark, 'id'>) => void;
  updateWaterPark: (id: string, data: Partial<WaterPark>) => void;
  deleteWaterPark: (id: string) => void;
  addChecker: (checker: Omit<Checker, 'id'>) => void;
  updateChecker: (id: string, data: Partial<Checker>) => void;
  deleteChecker: (id: string) => void;
}

// Mock data generator
const generateMockData = () => {
  const waterParks: WaterPark[] = [
    {
      id: '1',
      name: 'Acuático Paradise',
      activeTickets: 342,
      soldTickets: 1250,
      printedTickets: 1400,
      inactiveTickets: 150,
      totalRevenue: 187500
    },
    {
      id: '2',
      name: 'Aqua Fun',
      activeTickets: 187,
      soldTickets: 830,
      printedTickets: 900,
      inactiveTickets: 70,
      totalRevenue: 124500
    },
    {
      id: '3',
      name: 'Cascadas Resort',
      activeTickets: 421,
      soldTickets: 1580,
      printedTickets: 1700,
      inactiveTickets: 120,
      totalRevenue: 237000
    }
  ];

  const checkers: Checker[] = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com', waterParkId: '1', soldTickets: 410 },
    { id: '2', name: 'María López', email: 'maria@example.com', waterParkId: '1', soldTickets: 380 },
    { id: '3', name: 'Carlos González', email: 'carlos@example.com', waterParkId: '1', soldTickets: 460 },
    { id: '4', name: 'Ana Martínez', email: 'ana@example.com', waterParkId: '2', soldTickets: 290 },
    { id: '5', name: 'Pedro Sánchez', email: 'pedro@example.com', waterParkId: '2', soldTickets: 240 },
    { id: '6', name: 'Luisa Fernández', email: 'luisa@example.com', waterParkId: '2', soldTickets: 300 },
    { id: '7', name: 'Roberto Díaz', email: 'roberto@example.com', waterParkId: '3', soldTickets: 520 },
    { id: '8', name: 'Sofía Ramírez', email: 'sofia@example.com', waterParkId: '3', soldTickets: 490 },
    { id: '9', name: 'Miguel Torres', email: 'miguel@example.com', waterParkId: '3', soldTickets: 570 }
  ];

  // Generate daily stats for each water park
  const dailyStats: Record<string, DailyStats[]> = {};
  waterParks.forEach(park => {
    const parkStats: DailyStats[] = [];
    
    // Generate 7 days of stats
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const tickets = Math.floor(Math.random() * 100) + 50;
      parkStats.push({
        date: date.toISOString().split('T')[0],
        tickets,
        revenue: tickets * 150 // Assuming each ticket is $150
      });
    }
    
    dailyStats[park.id] = parkStats;
  });

  // Generate monthly stats for each water park
  const monthlyStats: Record<string, MonthlyStats[]> = {};
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  waterParks.forEach(park => {
    const parkStats: MonthlyStats[] = [];
    
    // Generate 6 months of stats
    for (let i = 5; i >= 0; i--) {
      const today = new Date();
      const monthIndex = (today.getMonth() - i + 12) % 12;
      const tickets = Math.floor(Math.random() * 2000) + 500;
      parkStats.push({
        month: months[monthIndex],
        tickets,
        revenue: tickets * 150 // Assuming each ticket is $150
      });
    }
    
    monthlyStats[park.id] = parkStats;
  });

  return { waterParks, checkers, dailyStats, monthlyStats };
};

const mockData = generateMockData();

export const useWaterParksStore = create<WaterParksState>()((set, get) => ({
  waterParks: mockData.waterParks,
  checkers: mockData.checkers,
  dailyStats: mockData.dailyStats,
  monthlyStats: mockData.monthlyStats,
  loading: false,
  error: null,
  
  fetchWaterParks: () => {
    // In a real app, this would be an API call
    set({ loading: true });
    
    // Simulate API call
    setTimeout(() => {
      set({ 
        waterParks: mockData.waterParks,
        loading: false 
      });
    }, 500);
  },
  
  fetchWaterParkDetails: (id: string) => {
    return get().waterParks.find(park => park.id === id);
  },
  
  fetchCheckers: (waterParkId: string) => {
    return get().checkers.filter(checker => checker.waterParkId === waterParkId);
  },
  
  fetchDailyStats: (waterParkId: string) => {
    return get().dailyStats[waterParkId] || [];
  },
  
  fetchMonthlyStats: (waterParkId: string) => {
    return get().monthlyStats[waterParkId] || [];
  },
  
  addWaterPark: (waterPark) => {
    const newWaterPark = {
      ...waterPark,
      id: Date.now().toString()
    };
    
    set(state => ({
      waterParks: [...state.waterParks, newWaterPark]
    }));
  },
  
  updateWaterPark: (id, data) => {
    set(state => ({
      waterParks: state.waterParks.map(park => 
        park.id === id ? { ...park, ...data } : park
      )
    }));
  },
  
  deleteWaterPark: (id) => {
    set(state => ({
      waterParks: state.waterParks.filter(park => park.id !== id)
    }));
  },
  
  addChecker: (checker) => {
    const newChecker = {
      ...checker,
      id: Date.now().toString()
    };
    
    set(state => ({
      checkers: [...state.checkers, newChecker]
    }));
  },
  
  updateChecker: (id, data) => {
    set(state => ({
      checkers: state.checkers.map(checker => 
        checker.id === id ? { ...checker, ...data } : checker
      )
    }));
  },
  
  deleteChecker: (id) => {
    set(state => ({
      checkers: state.checkers.filter(checker => checker.id !== id)
    }));
  }
}));