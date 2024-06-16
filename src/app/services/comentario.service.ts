import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from '../comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {


  private baseURL_comentarios ="http://localhost:8080/comentario";

  constructor(private httpClient : HttpClient) { }

    obtenerListaComentarios():Observable<Comentario[]>{
      return this.httpClient.get<Comentario[]>(`${this.baseURL_comentarios + "/listartodos"}`);
    }
    
    obtenerListaComentariosRecientes():Observable<Comentario[]>{
      return this.httpClient.get<Comentario[]>(`${this.baseURL_comentarios + "/listarRecientes"}`);
    }

    obtenerListaComentariosBorrados(): Observable<Comentario[]> {
      return this.httpClient.get<Comentario[]>(`${this.baseURL_comentarios + "/listartodosBorrado"}`);
    }

    insertarComentario(comentario: Comentario): Observable<void> {
      return this.httpClient.post<void>(`${this.baseURL_comentarios}/insertarComentario`, comentario);
    }

    
    obtenerListaComentariosTemas(temaNombre: string, canalNombre:string):Observable<Comentario[]>{
      return this.httpClient.get<Comentario[]>(`${this.baseURL_comentarios}/listartodosTemas?tema=${temaNombre}&canal=${canalNombre}`);
    }

    obtenerListaComentariosCanal(temaNombre: string,canalNombre: string):Observable<Comentario[]>{
      return this.httpClient.get<Comentario[]>(`${this.baseURL_comentarios}/listartodosCanal?tema=${temaNombre}&canal=${canalNombre}`);
    }

    eliminarComentario(idComentario: number): Observable<boolean> {
      console.log("idComentario eliminar: " + idComentario);
      return this.httpClient.post<boolean>(`${this.baseURL_comentarios}/actualizarBorrado`, idComentario);
    }


    eliminarComentarioPermanente(idComentario: number): Observable<boolean> {
      console.log("idComentario eliminar: " + idComentario);
      return this.httpClient.post<boolean>(`${this.baseURL_comentarios}/borradoPermanentemente`, idComentario);
    }
  
    restablecerComentario(idComentario: number): Observable<boolean> {
      console.log("idComentario eliminar: " + idComentario);
      return this.httpClient.post<boolean>(`${this.baseURL_comentarios}/restablecerComentario`, idComentario);
    }
}
