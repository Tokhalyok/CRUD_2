import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PositionService } from './position.service';
import { Position, PositionFormData } from '../interfaces/position.model';

@Component({
  selector: 'app-position-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {
  @Input() positionToEdit: Position | null = null;
  @Output() positionSaved = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  form: PositionFormData = {
    name: '',
    description: '',
    department: '',
    salary: 0,
    isActive: true,
    permissions: []
  };

  isEditing = false;
  errorMessage = '';
  successMessage = '';
  availablePermissions = ['read', 'write', 'delete', 'admin'];

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    if (this.positionToEdit) {
      this.isEditing = true;
      this.form = {
        name: this.positionToEdit.name || '',
        description: this.positionToEdit.description || '',
        department: this.positionToEdit.department || '',
        salary: this.positionToEdit.salary || 0,
        isActive: this.positionToEdit.isActive ?? true,
        permissions: this.positionToEdit.permissions || []
      };
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.name?.trim()) {
      this.errorMessage = 'Название должности обязательно';
      return;
    }

    if (!this.form.department?.trim()) {
      this.errorMessage = 'Отдел обязателен';
      return;
    }

    const positionData: Position = {
      name: this.form.name.trim(),
      description: this.form.description.trim(),
      department: this.form.department.trim(),
      salary: this.form.salary,
      isActive: this.form.isActive,
      permissions: this.form.permissions
    };

    if (this.isEditing && this.positionToEdit?.id) {
      this.updatePosition(this.positionToEdit.id, positionData);
    } else {
      this.createPosition(positionData);
    }
  }

  private createPosition(position: Position): void {
    this.positionService.createPosition(position).subscribe({
      next: () => {
        this.successMessage = 'Должность успешно создана';
        setTimeout(() => {
          this.positionSaved.emit();
          this.resetForm();
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Ошибка при создании должности';
      }
    });
  }

  private updatePosition(id: number, position: Position): void {
    this.positionService.updatePosition(id, position).subscribe({
      next: () => {
        this.successMessage = 'Должность успешно обновлена';
        setTimeout(() => {
          this.positionSaved.emit();
          this.resetForm();
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Ошибка при обновлении должности';
      }
    });
  }

  onCancel(): void {
    this.formCancelled.emit();
    this.resetForm();
  }

  onPermissionToggle(permission: string): void {
    const index = this.form.permissions.indexOf(permission);
    if (index > -1) {
      this.form.permissions.splice(index, 1);
    } else {
      this.form.permissions.push(permission);
    }
  }

  private resetForm(): void {
    this.form = {
      name: '',
      description: '',
      department: '',
      salary: 0,
      isActive: true,
      permissions: []
    };
    this.errorMessage = '';
    this.successMessage = '';
    this.isEditing = false;
  }
}
