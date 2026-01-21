import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionFormComponent } from './position/position-form.component';
import { PositionPermissionsComponent } from './position/position-permissions.component';
import { PositionsListComponent } from './position/positions-list.component';
import { PositionService } from './position/position.service';
import { Position } from './interfaces/position.model';

@Component({
  selector: 'app-position-demo',
  standalone: true,
  imports: [
    CommonModule,
    PositionFormComponent,
    PositionPermissionsComponent,
    PositionsListComponent
  ],
  template: `
    <div class="demo-container">
      <h1>Управление должностями - Демонстрация</h1>
      
      <div class="demo-grid">
        <div class="form-section">
          <app-position-form
            [positionToEdit]="editingPosition"
            (positionSaved)="onPositionSaved()"
            (formCancelled)="onFormCancelled()">
          </app-position-form>
        </div>
        
        <div class="list-section">
          <app-positions-list
            [positions]="positions"
            (positionEdit)="onPositionEdit($event)"
            (positionDelete)="onPositionDelete($event)"
            (positionSelect)="onPositionSelect($event)">
          </app-positions-list>
        </div>
      </div>
      
      <div class="permissions-section" *ngIf="selectedPosition">
        <app-position-permissions
          [position]="selectedPosition"
          (permissionsUpdated)="onPermissionsUpdated($event)">
        </app-position-permissions>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
    
    .demo-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .permissions-section {
      margin-top: 20px;
    }
    
    @media (max-width: 900px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PositionDemoComponent implements OnInit {
  positions: Position[] = [];
  editingPosition: Position | null = null;
  selectedPosition: Position | null = null;

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions(): void {
    this.positions = [
      {
        id: 1,
        name: 'Разработчик',
        description: 'Разработка программного обеспечения',
        department: 'IT',
        salary: 500000,
        isActive: true,
        permissions: ['read', 'write']
      },
      {
        id: 2,
        name: 'Менеджер проекта',
        description: 'Управление проектами',
        department: 'Management',
        salary: 600000,
        isActive: true,
        permissions: ['read', 'write', 'delete']
      },
      {
        id: 3,
        name: 'Тестировщик',
        description: 'Тестирование программного обеспечения',
        department: 'IT',
        salary: 350000,
        isActive: false,
        permissions: ['read']
      }
    ];
  }

  onPositionEdit(position: Position): void {
    this.editingPosition = position;
  }

  onPositionDelete(id: number): void {
    this.positions = this.positions.filter(p => p.id !== id);
    if (this.selectedPosition?.id === id) {
      this.selectedPosition = null;
    }
  }

  onPositionSelect(position: Position): void {
    this.selectedPosition = position;
  }

  onPositionSaved(): void {
    this.editingPosition = null;
    // В реальном приложении здесь был бы запрос к API
    console.log('Должность сохранена');
  }

  onFormCancelled(): void {
    this.editingPosition = null;
  }

  onPermissionsUpdated(position: Position): void {
    const index = this.positions.findIndex(p => p.id === position.id);
    if (index > -1) {
      this.positions[index] = position;
    }
  }
}
