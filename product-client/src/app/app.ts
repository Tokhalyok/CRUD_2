import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductService } from './services/product.service';
import { Product } from './interfaces/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onProductEdit(product: Product): void {
    this.editingProduct = product;
  }

  onProductSaved(): void {
    this.editingProduct = null;
    this.loadProducts();
  }

  onRefresh(): void {
    this.loadProducts();
  }
}
