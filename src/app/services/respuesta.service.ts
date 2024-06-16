import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuestas } from '../respuestas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  
  private baseURL_respuesta ="http://localhost:8080/respuesta";

  constructor(private httpClient : HttpClient) { }

  obtenerRespuestasComentario(idComentario:number):Observable<Respuestas[]>{
    return this.httpClient.get<Respuestas[]>(`${this.baseURL_respuesta}/listarRespuestaComentario?idComentario=${idComentario}`);
  }

  insertarRespuesta(respuesta: Respuestas): Observable<void> {
    return this.httpClient.post<void>(`${this.baseURL_respuesta}/insertarRespuestas`, respuesta);
  }
}
