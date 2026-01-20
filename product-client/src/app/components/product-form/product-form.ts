import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit {
  @Input() productToEdit: Product | null = null;
  @Output() productSaved = new EventEmitter<void>();
  
  form = { name: '', price: 0, category: '' };
  errorMessage = '';
  successMessage = '';
  isEditing = false;
  editingId: number | null = null;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    if (this.productToEdit) {
      this.isEditing = true;
      this.editingId = this.productToEdit.id || null;
      this.form = { ...this.productToEdit };
    }
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
          this.successMessage = 'Товар успешно обновлен!';
          setTimeout(() => {
            this.productSaved.emit();
            this.resetForm();
          }, 1500);
        },
        () => (this.errorMessage = '❌ Ошибка при обновлении товара!')
      );
    } else {
      this.service.createProduct(product).subscribe(
        () => {
          this.successMessage = 'Товар успешно добавлен!';
          setTimeout(() => {
            this.productSaved.emit();
            this.resetForm();
          }, 1500);
        },
        () => (this.errorMessage = '❌ Ошибка при добавлении товара!')
      );
    }
  }

  cancel(): void {
    this.productSaved.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.form = { name: '', price: 0, category: '' };
    this.errorMessage = '';
    this.successMessage = '';
    this.isEditing = false;
    this.editingId = null;
  }
}
