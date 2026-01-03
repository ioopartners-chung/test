export enum ProjectStatus {
  DRAFT = 'Draft',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  REVIEW = 'Under Review'
}

export enum ProjectType {
  OFFICE = 'Office',
  RESIDENTIAL = 'Residential',
  RETAIL = 'Retail',
  HOTEL = 'Hotel',
  MIXED = 'Mixed-Use'
}

export interface KPI {
  label: string;
  value: string | number;
  unit?: string;
  change?: number; // percentage
  status?: 'good' | 'neutral' | 'bad';
}

export interface Project {
  id: string;
  name: string;
  address: string;
  type: ProjectType;
  status: ProjectStatus;
  updatedAt: string;
  thumbnail?: string;
  kpi: {
    irr: number;
    totalCost: number; // in Billions (KRW)
    npv?: number;
    profit?: number;
  };
}

export interface CashFlowItem {
  period: string;
  revenue: number;
  cost: number;
  net: number;
  cumulative: number;
}
