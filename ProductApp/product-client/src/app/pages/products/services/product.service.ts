import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:5231/api/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.api);
  }

  createProduct(product: any) {
    return this.http.post(this.api, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.api}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}