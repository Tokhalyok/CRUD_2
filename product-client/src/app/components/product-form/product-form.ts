import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9; margin-bottom: 20px;">
      <h2>Добавить товар</h2>

      <div *ngIf="errorMessage" style="color: red; margin-bottom: 10px; padding: 10px; background: #ffe0e0; border-radius: 4px;">
        ⚠ {{ errorMessage }}
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Название</label>
        <input
          [(ngModel)]="name"
          type="text"
          placeholder="Название товара"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
        />
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Цена</label>
        <input
          [(ngModel)]="price"
          type="number"
          placeholder="100"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
        />
      </div>

      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Категория</label>
        <input
          [(ngModel)]="category"
          type="text"
          placeholder="Электроника"
          style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
        />
      </div>

      <button
        (click)="submit()"
        style="width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;"
      >
        Добавить
      </button>
    </div>
  `
})
export class ProductFormComponent {
  name: string = '';
  price: number = 0;
  category: string = '';
  errorMessage: string = '';

  constructor(private service: ProductService) {}

  submit(): void {
    if (!this.name || !this.price || !this.category) {
      this.errorMessage = 'Все поля обязательны!';
      return;
    }

    const product: Product = {
      name: this.name,
      price: this.price,
      category: this.category
    };

    this.service.createProduct(product).subscribe(
      () => {
        this.errorMessage = '';
        this.name = '';
        this.price = 0;
        this.category = '';
      },
      () => this.errorMessage = 'Ошибка при добавлении товара!'
    );
  }
}
