import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './models/components/product-list/product-list.component';
import { ProductForm } from './models/components/product-form/product-form';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, ProductForm],
  template: `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; min-height: 100vh;">
      <h1 style="color: #333; margin-bottom: 20px;">Fullstack CRUD (Angular + .NET 9 + PostGresql)</h1>
      <hr>

      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
          <div>
            <app-product-form
              [editingProduct]="editingProduct"
              (productAdded)="onProductAdded()"
            ></app-product-form>
          </div>
          <div>
            <app-product-list
              #productList
              (editProduct)="onEditProduct($event)"
            ></app-product-list>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  @ViewChild('productList') productList!: ProductListComponent;

  editingProduct: Product | null = null;

  onProductAdded() {
    this.editingProduct = null;
    if (this.productList) {
      this.productList.load();
    }
  }

  onEditProduct(product: Product) {
    this.editingProduct = product;
  }
}