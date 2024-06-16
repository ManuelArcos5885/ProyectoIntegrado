import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from '../titulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TituloService {


  //URL listado titulos
  private baseURL ="http://localhost:8080/titulo";

  constructor(private httpClient : HttpClient) { }

  obtenerListaTitulos():Observable<Titulo[]>{
    return this.httpClient.get<Titulo[]>(`${this.baseURL + "/listartodos"}`);
  }

  obtenerTodosEquiposMenos(tituloNombre:string): Observable<Titulo[]> {
    return this.httpClient.get<Titulo[]>(`${this.baseURL}/listartodosMenos?tituloNombre=${tituloNombre}`);
  }


  obtenerTitulo(idTitulo:number):Observable<Titulo[]>{
    return this.httpClient.get<Titulo[]>(`${this.baseURL}/obtenerTitulo?idTitulo=${idTitulo}`);
  }
  

  registrarTitulo(tituloNuevo:Titulo): Observable<void> {
    console.log(tituloNuevo.tituloNombre);
    return this.httpClient.post<void>(`${this.baseURL}/insertarTitulo`, tituloNuevo);
  }

  obtenerTituloPasado(nombreTitulo:string){
    return this.httpClient.get<Titulo[]>(`${this.baseURL}/tituloPasado?nombre=${nombreTitulo}`);
  }

}
