import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionService } from './position.service';
import { Position } from '../interfaces/position.model';

@Component({
  selector: 'app-position-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './position-permissions.component.html',
  styleUrls: ['./position-permissions.component.scss']
})
export class PositionPermissionsComponent implements OnInit {
  @Input() position: Position | null = null;
  @Output() permissionsUpdated = new EventEmitter<Position>();

  availablePermissions = [
    { key: 'read', label: 'Чтение', description: 'Просмотр данных' },
    { key: 'write', label: 'Запись', description: 'Создание и редактирование' },
    { key: 'delete', label: 'Удаление', description: 'Удаление данных' },
    { key: 'admin', label: 'Администрирование', description: 'Полные права' }
  ];

  selectedPermissions: string[] = [];
  isEditing = false;
  errorMessage = '';
  successMessage = '';

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    if (this.position) {
      this.selectedPermissions = [...(this.position.permissions || [])];
    }
  }

  togglePermission(permissionKey: string): void {
    const index = this.selectedPermissions.indexOf(permissionKey);
    if (index > -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permissionKey);
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    if (this.position) {
      this.selectedPermissions = [...(this.position.permissions || [])];
    }
    this.errorMessage = '';
    this.successMessage = '';
  }

  savePermissions(): void {
    if (!this.position?.id) {
      this.errorMessage = 'Должность не выбрана';
      return;
    }

    const updatedPosition: Position = {
      ...this.position,
      permissions: this.selectedPermissions
    };

    this.positionService.updatePosition(this.position.id, updatedPosition).subscribe({
      next: (result) => {
        this.position = result;
        this.selectedPermissions = [...(result.permissions || [])];
        this.isEditing = false;
        this.successMessage = 'Права доступа успешно обновлены';
        this.permissionsUpdated.emit(result);
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Ошибка при обновлении прав доступа';
      }
    });
  }

  hasPermission(permissionKey: string): boolean {
    return this.selectedPermissions.includes(permissionKey);
  }

  getPermissionLabel(permissionKey: string): string {
    const permission = this.availablePermissions.find(p => p.key === permissionKey);
    return permission?.label || permissionKey;
  }

  getPermissionDescription(permissionKey: string): string {
    const permission = this.availablePermissions.find(p => p.key === permissionKey);
    return permission?.description || '';
  }
}
