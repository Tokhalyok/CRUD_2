import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  @Output() productAdded = new EventEmitter<void>();
  @Input() editingProduct: Product | null = null;

  name: string = '';
  price: number = 0;
  category: string = '';
  errorMessage: string = '';

  constructor(private service: ProductService) { }

  submit() {
    if (!this.name || !this.price || !this.category) {
      this.errorMessage = 'Все поля обязательны!';
      return;
    }

    const product: Product = {
      name: this.name,
      price: this.price,
      category: this.category
    };

    if (this.editingProduct) {
      this.service.updateProduct(this.editingProduct.id!, product).subscribe(
        () => {
          this.clear();
          this.productAdded.emit();
        },
        error => this.errorMessage = 'Ошибка при обновлении товара!'
      );
    } else {
      this.service.createProduct(product).subscribe(
        () => {
          this.clear();
          this.productAdded.emit();
        },
        error => this.errorMessage = 'Товар "' + this.name + '" успешно добавлен!'
      );
    }
  }

  clear() {
    this.name = '';
    this.price = 0;
    this.category = '';
    this.editingProduct = null;
    this.errorMessage = '';
  }

  cancelEdit() {
    this.clear();
  }
}
