import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tema } from '../tema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private baseURL_comentarios ="http://localhost:8080/tema";

  constructor(private httpClient : HttpClient) { }

    obtenerListaTemas():Observable<Tema[]>{
      return this.httpClient.get<Tema[]>(`${this.baseURL_comentarios + "/listartodos"}`);
    }
}
