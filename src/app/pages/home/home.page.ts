import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, TrackByFunction } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Task, TaskCategory, TASK_CATEGORIES, TaskFilter } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  readonly categories = TASK_CATEGORIES;
  readonly categoryControl = new FormControl<TaskCategory | 'all'>('all');
  readonly statusControl = new FormControl<'all' | 'active' | 'completed'>('all');

  tasks: Task[] = [];
  stats = { total: 0, completed: 0, active: 0 };
  isAddModalOpen = false;

  newTitle = '';
  newDescription = '';
  newCategory: TaskCategory = 'personal';

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    combineLatest([
      this.categoryControl.valueChanges.pipe(startWith('all')),
      this.statusControl.valueChanges.pipe(startWith('all')),
    ]).pipe(
      debounceTime(100),
      takeUntil(this.destroy$),
    ).subscribe(([category, status]) => {
      const filter: TaskFilter = {
        category: category as TaskCategory | 'all',
        status: status as 'all' | 'active' | 'completed',
      };
      this.taskService.getTasks(filter)
        .pipe(takeUntil(this.destroy$))
        .subscribe(t => this.tasks = t);
    });

    this.taskService.getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe(s => this.stats = s);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openAddModal(): void  { this.isAddModalOpen = true; }
  closeAddModal(): void {
    this.isAddModalOpen = false;
    this.newTitle = '';
    this.newDescription = '';
    this.newCategory = 'personal';
  }

  addTask(): void {
    if (!this.newTitle.trim()) return;
    this.taskService.addTask(this.newTitle, this.newCategory, this.newDescription);
    this.closeAddModal();
  }

  toggle(id: string): void { this.taskService.toggleTask(id); }
  delete(id: string): void { this.taskService.deleteTask(id); }
  clearDone(): void        { this.taskService.clearCompleted(); }

  trackById: TrackByFunction<Task> = (_, t) => t.id;

  getCategoryMeta(cat: TaskCategory) {
    return TASK_CATEGORIES.find(c => c.value === cat);
  }

  get progress(): number {
    return this.stats.total ? Math.round((this.stats.completed / this.stats.total) * 100) : 0;
  }
}