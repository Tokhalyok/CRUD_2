import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position, PositionFilter } from '../interfaces/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'http://localhost:5231/api/positions';
  private positions: Position[] = [];

  constructor(private http: HttpClient) {}

  // Простые CRUD операции без сложной реактивности
  getPositions(filter?: PositionFilter): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  getPosition(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.apiUrl}/${id}`);
  }

  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, position);
  }

  updatePosition(id: number, position: Position): Observable<Position> {
    return this.http.put<Position>(`${this.apiUrl}/${id}`, position);
  }

  deletePosition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Простые методы для работы с данными без BehaviorSubject
  getPositionsSync(): Position[] {
    return this.positions;
  }

  setPositions(positions: Position[]): void {
    this.positions = positions;
  }

  addPositionLocal(position: Position): void {
    this.positions.push(position);
  }

  updatePositionLocal(id: number, position: Position): void {
    const index = this.positions.findIndex(p => p.id === id);
    if (index > -1) {
      this.positions[index] = position;
    }
  }

  removePositionLocal(id: number): void {
    this.positions = this.positions.filter(p => p.id !== id);
  }

  // Простые утилитарные методы
  getDepartments(): string[] {
    const departments = this.positions.map(p => p.department);
    return [...new Set(departments)];
  }

  getPositionsByDepartment(department: string): Position[] {
    return this.positions.filter(p => p.department === department);
  }

  getActivePositions(): Position[] {
    return this.positions.filter(p => p.isActive);
  }
}
