import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductFormComponent {
  @Output() onSubmit = new EventEmitter<Product>();
  @Output() onCancel = new EventEmitter<void>();

  form: Product = { name: '', price: 0, category: '' };
  errorMessage = '';
  successMessage = '';
  isEditing = false;

  setProductToEdit(product: Product): void {
    this.form = { ...product };
    this.isEditing = true;
    this.errorMessage = '';
  }

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.form.name?.trim() || !this.form.price || !this.form.category?.trim()) {
      this.errorMessage = 'Все поля обязательны!';
      return;
    }

    if (this.form.price <= 0) {
      this.errorMessage = 'Цена должна быть больше нуля!';
      return;
    }

    this.successMessage = this.isEditing ? 'Товар обновлен!' : 'Товар добавлен!';
    this.onSubmit.emit({ ...this.form });
    
    setTimeout(() => this.cancel(), 1000);
  }

  cancel(): void {
    this.form = { name: '', price: 0, category: '' };
    this.isEditing = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.onCancel.emit();
  }
}

