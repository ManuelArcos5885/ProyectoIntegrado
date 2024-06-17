import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estadio } from '../estadio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadioSerciveService {

  // URL listado estadioi
  private baseURL_estadio = "http://localhost:8080/estadio";

  constructor(private httpClient: HttpClient) { }

  obtenerTodosEstadios(): Observable<Estadio[]> {
    return this.httpClient.get<Estadio[]>(`${this.baseURL_estadio}/listarTodos`);
  }
  
  obtenerEstadioEquipoPasado(nombre: string): Observable<Estadio> {
    return this.httpClient.get<Estadio>(`${this.baseURL_estadio}/equipoPasado?nombreEquipo=${nombre}`);
  }

  registrarEstadio(estadio: Estadio): Observable<void> {
    console.log(estadio.equipoNombre);
    return this.httpClient.post<void>(`${this.baseURL_estadio}/insertarEstadio`, estadio);
  }

  actualizarDatosEstadio(estadio:Estadio): Observable<any>{
    console.log("Equipo Actualizar: " + estadio);
    return this.httpClient.post<void>(`${this.baseURL_estadio}/actualizarDatosEstadio`, estadio);
  }


}
