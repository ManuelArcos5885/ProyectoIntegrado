import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ganador } from '../ganador';

@Injectable({
  providedIn: 'root'
})
export class GanadoresTitulosService {

    //URL listado ganadores
    private baseURL_ganador ="http://localhost:8080/ganador";

  constructor(private httpClient : HttpClient) { }


  obtenerTitulosGanador(idEquipo:number):Observable<Ganador[]>{
    return this.httpClient.get<Ganador[]>(`${this.baseURL_ganador}/listarTituloGanado?idEquipo=${idEquipo}`);
  }


  obtenerGanadores():Observable<Ganador[]>{
    return this.httpClient.get<Ganador[]>(`${this.baseURL_ganador}/listarGanadores`);
  }

  obtenerGanadoresBorrados():Observable<Ganador[]>{
    return this.httpClient.get<Ganador[]>(`${this.baseURL_ganador}/listarGanadoresBorrados`);
  }

  registrarGanador(ganador:Ganador):Observable<void>{
    console.log(ganador.equipo);
    return this.httpClient.post<void>(`${this.baseURL_ganador}/insertarGanador`, ganador);
  }

  actualizarGanador(ganador:Ganador):Observable<void>{
    console.log("ganador actualizado id equipo:" + ganador.equipo);
    console.log("ganador actualizado id:" + ganador.idGanadores);
    console.log("ganador actualizado titulo:" + ganador.titulo);
    console.log("ganador actualizado cantidad:" + ganador.temporada);
    return this.httpClient.post<void>(`${this.baseURL_ganador}/actualizarGanador`, ganador);
  }


  eliminarGanador(idGanador: number): Observable<any> {
    console.log("idGanador eliminar: " + idGanador);
    return this.httpClient.post<void>(`${this.baseURL_ganador}/actualizarBorrado`, idGanador);
  }

  eliminarGanadorPermanente(idGanador: number): Observable<boolean> {
    console.log("idGanador eliminar: " + idGanador);
    return this.httpClient.post<boolean>(`${this.baseURL_ganador}/borradoPermanentemente`, idGanador);
  }

  restablecerGanador(idGanador: number): Observable<boolean> {
    console.log("idGanador eliminar: " + idGanador);
    return this.httpClient.post<boolean>(`${this.baseURL_ganador}/restablecerGanador`, idGanador);
  }

  obtenerGanadorPasado(nombreEquipo:string,nombreTitulo:string,temporada:string): Observable<Ganador>{
    console.log("equipo nombre: " + nombreEquipo);

    return this.httpClient.get<Ganador>(`${this.baseURL_ganador}/obtenerGanadorTemporada?nombreEquipo=${nombreEquipo}&nombreTitulo=${nombreTitulo}&temporada=${temporada}`);

  }

  obtenerGanadorPorId(idGanador:number): Observable<Ganador>{
    console.log("equipo nombre: " + idGanador);

    return this.httpClient.get<Ganador>(`${this.baseURL_ganador}/obtenerGanadorTemporada?idGanador=${idGanador}}`);

  }


  obtenerGanadoresTitulo(nombreEquipo:string,nombreTitulo:string): Observable<Ganador[]>{
    console.log("equipo nombre: " + nombreEquipo);

    return this.httpClient.get<Ganador[]>(`${this.baseURL_ganador}/obtenerGanadoresTitulo?nombreEquipo=${nombreEquipo}&nombreTitulo=${nombreTitulo}`);

  }

  obtenerGanadoresTituloTodos(nombreTitulo:string): Observable<Ganador[]>{
    console.log("Competicion nombre: " + nombreTitulo);

    return this.httpClient.get<Ganador[]>(`${this.baseURL_ganador}/obtenerGanadoresTituloTodos?nombreTitulo=${nombreTitulo}`);

  }
}
