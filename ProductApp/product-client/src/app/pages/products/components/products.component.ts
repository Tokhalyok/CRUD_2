import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', price: 0 };
  editProduct: any = null;

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.price > 0) {
      this.service.createProduct(this.newProduct).subscribe(() => {
        this.newProduct = { name: '', price: 0 };
        this.loadProducts();
      });
    }
  }

  editStart(product: any) {
    this.editProduct = { ...product };
  }

  saveEdit() {
    this.service.updateProduct(this.editProduct.id, this.editProduct).subscribe(() => {
      this.editProduct = null;
      this.loadProducts();
    });
  }

  cancelEdit() {
    this.editProduct = null;
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}