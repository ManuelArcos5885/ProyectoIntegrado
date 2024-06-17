import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo } from '../equipo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  // URL listado equipos
  private baseURL_equipo = "http://localhost:8080/equipo";

  constructor(private httpClient: HttpClient) { }

  // Con la baseURL devuelve todos los empleados en una lista
  obtenerListaEquipos(division: string): Observable<Equipo[]> {
    return this.httpClient.get<Equipo[]>(`${this.baseURL_equipo}/listarDivision?division=${division}`);
  }
  
  
  obtenerTodosEquipos(): Observable<Equipo[]> {
    return this.httpClient.get<Equipo[]>(`${this.baseURL_equipo}/listarTodos`);
  }

  eliminarEquipoermanente(idEquipo: number): Observable<boolean> {
    console.log("idEquipo eliminar: " + idEquipo);
    return this.httpClient.post<boolean>(`${this.baseURL_equipo}/borradoPermanentemente`, idEquipo);
  }

  restablecerEquipo(idEquipo: number): Observable<boolean> {
    console.log("idEquipo eliminar: " + idEquipo);
    return this.httpClient.post<boolean>(`${this.baseURL_equipo}/restablecerEquipo`, idEquipo);
  }

  

  obtenerTodosEquiposBorrado(): Observable<Equipo[]> {
    return this.httpClient.get<Equipo[]>(`${this.baseURL_equipo}/listartodosBorrado`);
  }

  obtenerEquiposComunidad(comunidadNombre:string): Observable<Equipo[]> {
    console.log("NOMBRE COMUNIDAD: ");
    console.log(comunidadNombre);
    return this.httpClient.get<Equipo[]>(`${this.baseURL_equipo}/listarComunidad?comunidadNombre=${comunidadNombre}`);
  }

  obtenerEquiposCiudad(ciudadNombre:string): Observable<Equipo[]> {
    console.log("NOMBRE Ciudad: ");
    console.log(ciudadNombre);
    return this.httpClient.get<Equipo[]>(`${this.baseURL_equipo}/listarCiudad?ciudadNombre=${ciudadNombre}`);
  }


  obtenerEquipoPasado(nombre: string): Observable<Equipo[]> {
    return this.httpClient.get<Equipo[]>(`${this.baseURL_equipo}/equipoPasado?nombre=${nombre}`);
  }

  eliminarEquipo(nombre: string): Observable<any> {
    console.log("Nomber equipo eliminar: " + nombre);
    return this.httpClient.post<void>(`${this.baseURL_equipo}/actualizarBorrado`, nombre);
  }

  actualizarDatosEquipo(equipo:Equipo): Observable<any>{
    console.log("Equipo Actualizar: " + equipo);
    return this.httpClient.post<void>(`${this.baseURL_equipo}/actualizarDatosEquipo`, equipo);
  }


  obtenerEquipoId(idEquipo:number):Observable<Equipo>{
    return this.httpClient.get<Equipo>(`${this.baseURL_equipo}/equipoPorId?idEquipo=${idEquipo}`);
  }

  obtenerEquipoNombre(nombreEquipo:string):Observable<Equipo>{
    return this.httpClient.get<Equipo>(`${this.baseURL_equipo}/equipoPorNombre?nombreEquipo=${nombreEquipo}`);
  }



  registrarEquipo(equipo: Equipo): Observable<void> {
    console.log(equipo.equipo_nombre);
    return this.httpClient.post<void>(`${this.baseURL_equipo}/insertarEquipo`, equipo);
  }
}
