import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Список товаров</h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead style="background: #f0f0f0;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">ID</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Название</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Цена</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Категория</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of products" style="border: 1px solid #ddd;">
            <td style="border: 1px solid #ddd; padding: 10px;">{{ p.id }}</td>
            <td style="border: 1px solid #ddd; padding: 10px;">{{ p.name }}</td>
            <td style="border: 1px solid #ddd; padding: 10px;">{{ p.price }} тг</td>
            <td style="border: 1px solid #ddd; padding: 10px;">{{ p.category }}</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
              <button
                (click)="edit(p)"
                style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; margin-right: 5px; cursor: pointer;"
              >
                ✏ Изменить
              </button>
              <button
                (click)="delete(p.id!)"
                style="padding: 6px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                ✕ Удалить
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
  @Output() editProduct = new EventEmitter<Product>();

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getProducts().subscribe(
      data => this.products = data,
      error => console.error('Ошибка загрузки товаров', error)
    );
  }

  delete(id: number) {
    if (confirm('Вы уверены?')) {
      this.service.deleteProduct(id).subscribe(
        () => this.load(),
        error => console.error('Ошибка удаления', error)
      );
    }
  }

  edit(product: Product) {
    this.editProduct.emit(product);
  }
}