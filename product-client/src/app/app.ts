import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductListComponent } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  template: `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      <h1 style="text-align: center; color: #333; margin-bottom: 30px;">📦 Управление товарами</h1>
      
      <div style="display: grid; gap: 20px;">
        <app-product-form></app-product-form>
        <app-product-list></app-product-list>
      </div>
    </div>
  `,
  styles: [`
    :host {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f5f5f5;
      display: block;
      min-height: 100vh;
      padding: 20px 0;
    }
  `]
})
export class AppComponent {}
