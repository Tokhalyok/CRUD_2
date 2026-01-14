import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9;">
      <h2>Список товаров</h2>

      <div *ngIf="products.length === 0" style="color: #666; text-align: center; padding: 20px;">
        Товаров еще нет. Добавьте первый товар!
      </div>

      <table *ngIf="products.length > 0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #e9ecef; border-bottom: 2px solid #dee2e6;">
            <th style="padding: 10px; text-align: left; font-weight: bold;">Название</th>
            <th style="padding: 10px; text-align: right; font-weight: bold;">Цена</th>
            <th style="padding: 10px; text-align: left; font-weight: bold;">Категория</th>
            <th style="padding: 10px; text-align: center; font-weight: bold;">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products" style="border-bottom: 1px solid #dee2e6;">
            <td style="padding: 10px;">{{ product.name }}</td>
            <td style="padding: 10px; text-align: right;">{{ product.price | currency }}</td>
            <td style="padding: 10px;">{{ product.category }}</td>
            <td style="padding: 10px; text-align: center;">
              <button
                (click)="deleteProduct(product.id!)"
                style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe(
      products => this.products = products
    );
  }

  deleteProduct(id: number): void {
    if (confirm('Вы уверены?')) {
      this.service.deleteProduct(id).subscribe();
    }
  }
}
