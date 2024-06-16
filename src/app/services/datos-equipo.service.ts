import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datos } from '../datos';

@Injectable({
  providedIn: 'root'
})
export class DatosEquipoService {

  // URL listado datosEquipo
  private baseURL_datos = "http://localhost:8080/datosEquipo";

  constructor(private httpClient: HttpClient) { }


  obtenerListaDatos(nombreEquipo: string): Observable<Datos[]> {
    console.log(nombreEquipo);
    return this.httpClient.get<Datos[]>(`${this.baseURL_datos}/listarDatos?nombre=${nombreEquipo}`);
  }
}