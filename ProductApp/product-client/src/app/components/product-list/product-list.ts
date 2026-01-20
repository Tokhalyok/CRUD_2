import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() onEdit = new EventEmitter<Product>();
  @Output() onDelete = new EventEmitter<number>();

  editProduct(product: Product): void {
    this.onEdit.emit(product);
  }

  deleteProduct(id: number): void {
    const product = this.products.find(p => p.id === id);
    if (confirm(`Удалить "${product?.name}"?`)) {
      this.onDelete.emit(id);
    }
  }
}


