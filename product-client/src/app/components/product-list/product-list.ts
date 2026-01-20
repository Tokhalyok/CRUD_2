import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%); box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 20px 0; color: #333;">📋 Список товаров</h2>

      <div *ngIf="products.length === 0" style="color: #999; text-align: center; padding: 40px 20px; font-size: 16px;">
        Нет товаров. Добавьте первый товар! ✨
      </div>

      <div *ngIf="products.length > 0" style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white;">
              <th style="padding: 14px; text-align: left; font-weight: 600; border: none;">Название</th>
              <th style="padding: 14px; text-align: right; font-weight: 600; border: none;">Цена</th>
              <th style="padding: 14px; text-align: left; font-weight: 600; border: none;">Категория</th>
              <th style="padding: 14px; text-align: center; font-weight: 600; border: none;">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              *ngFor="let product of products; let last = last" 
              style="border-bottom: 1px solid #e0e0e0; transition: background 0.2s; cursor: pointer;"
              (mouseenter)="onRowHover($event, true)"
              (mouseleave)="onRowHover($event, false)"
            >
              <td style="padding: 12px; color: #333; font-weight: 500;">{{ product.name }}</td>
              <td style="padding: 12px; text-align: right; color: #007bff; font-weight: 600;">{{ product.price | currency:'KZT':'symbol':'1.0-0' }}</td>
              <td style="padding: 12px; color: #666;">{{ product.category }}</td>
              <td style="padding: 12px; text-align: center;">
                <button
                  (click)="editProduct(product)"
                  (mouseenter)="onButtonHover($event, true, 'edit')"
                  (mouseleave)="onButtonHover($event, false, 'edit')"
                  style="padding: 7px 14px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; margin-right: 6px; transition: background 0.2s; font-size: 13px;"
                >
                  ✏️
                </button>
                <button
                  (click)="deleteProduct(product.id!)"
                  (mouseenter)="onButtonHover($event, true, 'delete')"
                  (mouseleave)="onButtonHover($event, false, 'delete')"
                  style="padding: 7px 14px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; transition: background 0.2s; font-size: 13px;"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="products.length > 0" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px; text-align: right;">
        Всего товаров: <strong>{{ products.length }}</strong>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  editProduct(product: Product): void {
    this.service.setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(id: number): void {
    const product = this.products.find(p => p.id === id);
    if (confirm(`Вы уверены, что хотите удалить "${product?.name}"?`)) {
      this.service.deleteProduct(id).subscribe();
    }
  }

  onRowHover(event: MouseEvent, isHover: boolean): void {
    const target = event.currentTarget as HTMLElement;
    if (isHover) {
      target.style.background = '#f5f5f5';
    } else {
      target.style.background = 'transparent';
    }
  }

  onButtonHover(event: MouseEvent, isHover: boolean, type: 'edit' | 'delete'): void {
    const target = event.target as HTMLButtonElement;
    if (isHover) {
      target.style.background = type === 'edit' ? '#218838' : '#c82333';
    } else {
      target.style.background = type === 'edit' ? '#28a745' : '#dc3545';
    }
  }
}
