export enum CategoryType {
  AI = 'AI',
  AUTOMATION = 'Automation',
  GENERAL = 'General',
}

export const AVAILABLE_THEMES = [
  'Commercial',
  'Credit Control',
  'Management Accounts',
  'Operations',
  'Payroll',
  'Rev Ops',
  'User Experience',
];

export interface Idea {
  id: number;
  title: string;
  description: string;
  votes: number;
  createdAt: Date;
  themes: string[];
  category: CategoryType;
  authorName: string;
  authorEmail:string;
  authorTeam: string;
  authorDivision: string;
}

export enum SortOption {
  POPULARITY = 'POPULARITY',
  NEWEST = 'NEWEST',
}