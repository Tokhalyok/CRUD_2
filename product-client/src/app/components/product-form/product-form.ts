import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%); box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 15px 0; color: #333;">{{ isEditing ? '✏️ Редактировать' : '➕ Добавить товар' }}</h2>

      <div *ngIf="errorMessage" style="color: #dc3545; margin-bottom: 15px; padding: 12px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 6px; font-weight: 500;">
        {{ errorMessage }}
      </div>

      <div *ngIf="successMessage" style="color: #155724; margin-bottom: 15px; padding: 12px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; font-weight: 500;">
        {{ successMessage }}
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #333;">Название</label>
        <input
          [(ngModel)]="form.name"
          type="text"
          placeholder="Например: Смартфон"
          style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-size: 14px; transition: border-color 0.2s;"
        />
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #333;">Цена (₽)</label>
        <input
          [(ngModel)]="form.price"
          type="number"
          placeholder="1000"
          style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-size: 14px;"
        />
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #333;">Категория</label>
        <input
          [(ngModel)]="form.category"
          type="text"
          placeholder="Например: Электроника"
          style="width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; font-size: 14px;"
        />
      </div>

      <div style="display: flex; gap: 10px;">
        <button
          (click)="submit()"
          (mouseenter)="onButtonHover($event, true)"
          (mouseleave)="onButtonHover($event, false)"
          style="flex: 1; padding: 11px 16px; background: #007bff; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-size: 14px;"
        >
          {{ isEditing ? 'Сохранить' : 'Добавить' }}
        </button>
        <button
          *ngIf="isEditing"
          (click)="cancel()"
          (mouseenter)="onButtonHover($event, true)"
          (mouseleave)="onButtonHover($event, false)"
          style="flex: 1; padding: 11px 16px; background: #6c757d; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-size: 14px;"
        >
          Отмена
        </button>
      </div>
    </div>
  `
})
export class ProductFormComponent implements OnInit {
  form = { name: '', price: 0, category: '' };
  errorMessage = '';
  successMessage = '';
  isEditing = false;
  editingId: number | null = null;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.editingProduct$.subscribe(product => {
      if (product) {
        this.isEditing = true;
        this.editingId = product.id || null;
        this.form = { ...product };
      } else {
        this.cancel();
      }
    });
  }

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.name?.trim() || !this.form.price || !this.form.category?.trim()) {
      this.errorMessage = '⚠️ Все поля обязательны!';
      return;
    }

    if (this.form.price <= 0) {
      this.errorMessage = '⚠️ Цена должна быть больше нуля!';
      return;
    }

    const product: Product = {
      name: this.form.name.trim(),
      price: this.form.price,
      category: this.form.category.trim()
    };

    if (this.isEditing && this.editingId) {
      this.service.updateProduct(this.editingId, product).subscribe(
        () => {
          this.successMessage = '✅ Товар успешно обновлен!';
          setTimeout(() => this.cancel(), 1500);
        },
        () => (this.errorMessage = '❌ Ошибка при обновлении товара!')
      );
    } else {
      this.service.createProduct(product).subscribe(
        () => {
          this.successMessage = '✅ Товар успешно добавлен!';
          setTimeout(() => this.resetForm(), 1500);
        },
        () => (this.errorMessage = '❌ Ошибка при добавлении товара!')
      );
    }
  }

  cancel(): void {
    this.service.setEditingProduct(null);
    this.resetForm();
  }

  onButtonHover(event: MouseEvent, isHover: boolean): void {
    const target = event.target as HTMLButtonElement;
    if (isHover) {
      if (target.textContent?.includes('Сохранить') || target.textContent?.includes('Добавить')) {
        target.style.background = '#0056b3';
      } else {
        target.style.background = '#5a6268';
      }
    } else {
      if (target.textContent?.includes('Сохранить') || target.textContent?.includes('Добавить')) {
        target.style.background = '#007bff';
      } else {
        target.style.background = '#6c757d';
      }
    }
  }

  private resetForm(): void {
    this.form = { name: '', price: 0, category: '' };
    this.errorMessage = '';
    this.successMessage = '';
    this.isEditing = false;
    this.editingId = null;
  }
}
