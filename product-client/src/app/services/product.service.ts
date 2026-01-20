import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5231/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private editingProductSubject = new BehaviorSubject<Product | null>(null);

  public products$ = this.productsSubject.asObservable();
  public editingProduct$ = this.editingProductSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      products => this.productsSubject.next(products),
      error => console.error('Error loading products:', error)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  setEditingProduct(product: Product | null): void {
    this.editingProductSubject.next(product);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProduct => {
        const current = this.productsSubject.value;
        this.productsSubject.next([...current, newProduct]);
      })
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(updatedProduct => {
        const current = this.productsSubject.value;
        const index = current.findIndex(p => p.id === id);
        if (index > -1) {
          const updated = [...current];
          updated[index] = updatedProduct;
          this.productsSubject.next(updated);
        }
        this.editingProductSubject.next(null);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.productsSubject.value;
        this.productsSubject.next(current.filter(p => p.id !== id));
      })
    );
  }
}
