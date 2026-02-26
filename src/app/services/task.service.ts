import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Task, TaskCategory, TaskFilter } from '../models/task.model';

const STORAGE_KEY = 'todo_tasks_v1';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>(this.loadFromStorage());

  getTasks(filter?: TaskFilter): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => this.applyFilter(tasks, filter)),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  getStats(): Observable<{ total: number; completed: number; active: number }> {
    return this.tasks$.pipe(
      map(tasks => ({
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        active: tasks.filter(t => !t.completed).length,
      }))
    );
  }

  addTask(title: string, category: TaskCategory, description?: string): void {
    const now = new Date();
    const task: Task = {
      id: this.generateId(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      category,
      createdAt: now,
      updatedAt: now,
    };
    this.updateTasks([...this.tasks$.value, task]);
  }

  toggleTask(id: string): void {
    const updated = this.tasks$.value.map(t =>
      t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date() } : t
    );
    this.updateTasks(updated);
  }

  deleteTask(id: string): void {
    this.updateTasks(this.tasks$.value.filter(t => t.id !== id));
  }

  clearCompleted(): void {
    this.updateTasks(this.tasks$.value.filter(t => !t.completed));
  }

  private applyFilter(tasks: Task[], filter?: TaskFilter): Task[] {
    if (!filter) return tasks;
    return tasks.filter(t => {
      const catMatch = !filter.category || filter.category === 'all' || t.category === filter.category;
      const statusMatch =
        !filter.status || filter.status === 'all' ||
        (filter.status === 'completed' && t.completed) ||
        (filter.status === 'active' && !t.completed);
      return catMatch && statusMatch;
    });
  }

  private updateTasks(tasks: Task[]): void {
    this.tasks$.next(tasks);
    this.saveToStorage(tasks);
  }

  private saveToStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks', e);
    }
  }

  private loadFromStorage(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.getSeedData();
      const tasks = JSON.parse(raw) as Task[];
      return tasks.map(t => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
      }));
    } catch {
      return this.getSeedData();
    }
  }

  private getSeedData(): Task[] {
    const now = new Date();
    return [
      { id: '1', title: 'Revisar correos', category: 'trabajo', completed: false, createdAt: now, updatedAt: now },
      { id: '2', title: 'Comprar mercado', category: 'compras', completed: true,  createdAt: now, updatedAt: now },
      { id: '3', title: 'Ejercicio 30 min', category: 'salud',  completed: false, createdAt: now, updatedAt: now },
    ] as Task[];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}