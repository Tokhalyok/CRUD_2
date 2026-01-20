import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Output() productEdit = new EventEmitter<Product>();
  @Output() productDelete = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnChanges(): void {
    // Обновляем данные при изменении входных параметров
  }

  editProduct(product: Product): void {
    this.productEdit.emit(product);
  }

  deleteProduct(id: number): void {
    const product = this.products.find(p => p.id === id);
    if (confirm(`Вы уверены, что хотите удалить "${product?.name}"?`)) {
      this.service.deleteProduct(id).subscribe(() => {
        this.refresh.emit();
      });
    }
  }
}
