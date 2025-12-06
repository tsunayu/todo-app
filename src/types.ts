export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';
