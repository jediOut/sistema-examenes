import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Pregunta } from '../models/examen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  constructor(private http: HttpClient) {}
  public listarPreguntasDelExamen(id: number) {
    return this.http.get<Pregunta[]>(`${baseUrl}/pregunta/examen/todos/${id}`);
  }
  public guardar(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(`${baseUrl}/pregunta/`, pregunta);
  }
  public eliminar(id: number) {
    return this.http.delete(`${baseUrl}/pregunta/${id}`);
  }
  public actualizar(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.put<Pregunta>(`${baseUrl}/pregunta/`, pregunta);
  }
  public obtenerPregunta(id: number): Observable<Pregunta> {
    return this.http.get<Pregunta>(`${baseUrl}/pregunta/${id}`);
  }
  public listarPreguntasDelExamenParaLaPrueba(id: number) {
    return this.http.get<Pregunta[]>(`${baseUrl}/pregunta/examen/todos/${id}`);
  }
  public evaluarExamen(preguntas: Pregunta[]) {
    return this.http.post(`${baseUrl}/pregunta/evaluar-examen`, preguntas);
  }
}
