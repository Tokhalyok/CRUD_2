import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductListComponent } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 15px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; color: white;">
          <h1 style="margin: 0 0 10px 0; font-size: 36px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            📦 Управление товарами
          </h1>
          <p style="margin: 0; font-size: 16px; opacity: 0.9;">
            Полнофункциональное CRUD приложение
          </p>
        </div>

        <!-- Main Content -->
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 25px; margin-bottom: 30px;">
          <div>
            <app-product-form></app-product-form>
          </div>
          <div>
            <app-product-list></app-product-list>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 30px;">
          <p style="margin: 0;">
            ✨ Angular 19 + .NET 9 + PostgreSQL | API: localhost:5231
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: block;
    }

    @media (max-width: 900px) {
      :host ::ng-deep {
        [style*="grid-template-columns: 1fr 2fr"] {
          grid-template-columns: 1fr !important;
        }
      }
    }
  `]
})
export class AppComponent {}
