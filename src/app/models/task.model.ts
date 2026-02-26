export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: TaskCategory;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskCategory = 'personal' | 'trabajo' | 'compras' | 'salud' | 'otro';

export const TASK_CATEGORIES: { value: TaskCategory; label: string; icon: string; color: string }[] = [
  { value: 'personal', label: 'Personal',  icon: 'person',              color: '#3880ff' },
  { value: 'trabajo',  label: 'Trabajo',   icon: 'briefcase',           color: '#eb445a' },
  { value: 'compras',  label: 'Compras',   icon: 'cart',                 color: '#2dd36f' },
  { value: 'salud',    label: 'Salud',     icon: 'medical',              color: '#ffc409' },
  { value: 'otro',     label: 'Otro',      icon: 'ellipsis-horizontal',  color: '#92949c' },
];

export interface TaskFilter {
  category?: TaskCategory | 'all';
  status?: 'all' | 'active' | 'completed';
}