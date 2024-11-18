import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Categoria, Examen } from '../models/examen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  constructor(private http: HttpClient) {}
  public listarExamenes() {
    return this.http.get<Examen[]>(`${baseUrl}/examen/`);
  }
  public guardar(examen: any) {
    return this.http.post(`${baseUrl}/examen/`, examen);
  }
  public eliminar(id: number) {
    return this.http.delete(`${baseUrl}/examen/${id}`);
  }
  public obtenerExamen(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${baseUrl}/examen/${id}`);
  }
  public listarExamenesDeUnaCategoria(id: number) {
    return this.http.get<Examen[]>(`${baseUrl}/examen/categoria/${id}`);
  }
  public obtenerExamenesActivos() {
    return this.http.get<Examen[]>(`${baseUrl}/examen/activo`);
  }
  public obtenerExamenesActivosDeUnaCategoria(id: number) {
    return this.http.get<Examen[]>(`${baseUrl}/examen/categoria/activo/${id}`);
  }
}
