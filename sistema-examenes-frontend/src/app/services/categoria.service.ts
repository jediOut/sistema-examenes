import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Categoria } from '../models/examen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}
  public listarCategorias() {
    return this.http.get<Categoria[]>(`${baseUrl}/categoria/`);
  }
  public agregarCaegoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${baseUrl}/categoria/`, categoria);
  }
}
