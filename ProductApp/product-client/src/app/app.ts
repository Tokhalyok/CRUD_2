import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductService } from './services/product.service';
import { Product } from './interfaces/product.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>📦 Управление товарами</h1>
      </header>

      <div class="app-content">
        <div class="form-card">
          <app-product-form
            #formComponent
            (onSubmit)="handleFormSubmit($event)"
            (onCancel)="handleFormCancel()">
          </app-product-form>
        </div>

        <div class="list-card">
          <app-product-list
            [products]="products"
            (onEdit)="handleEdit($event)"
            (onDelete)="handleDelete($event)">
          </app-product-list>
        </div>
      </div>

      <footer class="app-footer">
        <p>Angular 19 + .NET 9 + PostgreSQL</p>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: block;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .app-header {
      text-align: center;
      margin-bottom: 30px;
      color: white;
    }

    .app-header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }

    .app-content {
      max-width: 1000px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 20px;
    }

    .form-card, .list-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .app-footer {
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      font-size: 13px;
      margin-top: 40px;
    }

    .app-footer p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .app-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('formComponent') formComponent!: ProductFormComponent;

  products: Product[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Ошибка загрузки товаров:', error);
      }
    });
  }

  handleFormSubmit(product: Product): void {
    if (product.id) {
      // Редактирование
      this.service.updateProduct(product.id, product).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Ошибка обновления:', error);
        }
      });
    } else {
      // Добавление
      this.service.createProduct(product).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Ошибка добавления:', error);
        }
      });
    }
  }

  handleFormCancel(): void {
    // Ничего не нужно делать
  }

  handleEdit(product: Product): void {
    this.formComponent.setProductToEdit(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleDelete(id: number): void {
    this.service.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
      },
      error: (error) => {
        console.error('Ошибка удаления:', error);
      }
    });
  }
}

