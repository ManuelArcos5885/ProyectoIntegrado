import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comunidad } from '../comunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  //URL listado comunidades
  private baseURL_comunidades ="http://localhost:8080/comunidad";

  constructor(private httpClient : HttpClient) { }


  
  //con la baseURL devuelve todos los empleados en una lista
  obtenerListaComunidades():Observable<Comunidad[]>{
    return this.httpClient.get<Comunidad[]>(`${this.baseURL_comunidades + "/listartodos"}`);
  }

  obtenerComunidad(nombreComunidad:string):Observable<Comunidad>{
    return this.httpClient.get<Comunidad>(`${this.baseURL_comunidades}/comunidadPorNombre?nombreComunidad=${nombreComunidad}`);
  }


    



  registrarComunidad(comunidad: Comunidad): Observable<void> {
    console.log(comunidad.comunidad_nombre);
    return this.httpClient.post<void>(`${this.baseURL_comunidades}/insertarComunidad`, comunidad);
  }


}
