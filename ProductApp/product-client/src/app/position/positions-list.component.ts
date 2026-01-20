import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionService } from './position.service';
import { Position, PositionFilter } from '../interfaces/position.model';

@Component({
  selector: 'app-positions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.scss']
})
export class PositionsListComponent implements OnInit, OnChanges {
  @Input() positions: Position[] = [];
  @Input() filter: PositionFilter = {};
  @Output() positionEdit = new EventEmitter<Position>();
  @Output() positionDelete = new EventEmitter<number>();
  @Output() positionSelect = new EventEmitter<Position>();

  filteredPositions: Position[] = [];
  selectedPosition: Position | null = null;
  searchTerm = '';
  selectedDepartment = '';

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.applyFilter();
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  onSearch(): void {
    this.applyFilter();
  }

  onDepartmentFilter(): void {
    this.applyFilter();
  }

  onSelectPosition(position: Position): void {
    this.selectedPosition = position;
    this.positionSelect.emit(position);
  }

  onEditPosition(position: Position): void {
    this.positionEdit.emit(position);
  }

  onDeletePosition(position: Position): void {
    if (position.id && confirm(`Вы уверены, что хотите удалить должность "${position.name}"?`)) {
      this.positionDelete.emit(position.id);
    }
  }

  private applyFilter(): void {
    this.filteredPositions = this.positions.filter(position => {
      // Фильтр по поисковому термину
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        const matchesSearch = 
          position.name.toLowerCase().includes(searchLower) ||
          position.description?.toLowerCase().includes(searchLower) ||
          position.department.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Фильтр по отделу
      if (this.selectedDepartment && position.department !== this.selectedDepartment) {
        return false;
      }

      // Фильтр по активности
      if (this.filter.isActive !== undefined && position.isActive !== this.filter.isActive) {
        return false;
      }

      return true;
    });
  }

  getDepartments(): string[] {
    const departments = this.positions.map(p => p.department);
    return [...new Set(departments)];
  }

  getActivePositionCount(): number {
    return this.positions.filter(p => p.isActive).length;
  }

  getInactivePositionCount(): number {
    return this.positions.filter(p => !p.isActive).length;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.filter = {};
    this.applyFilter();
  }

  hasPermissions(position: Position): boolean {
    return !!(position.permissions && position.permissions.length > 0);
  }

  getPermissionCount(position: Position): number {
    return position.permissions?.length || 0;
  }
}
