import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Canal } from '../canal';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  private baseURL_canal ="http://localhost:8080/canal";

  constructor(private httpClient : HttpClient) { }

    obtenerListaCanal():Observable<Canal[]>{
      return this.httpClient.get<Canal[]>(`${this.baseURL_canal + "/listartodos"}`);
    }

    

    insertarCanal(canalNuevo: Canal):Observable<void>{
      console.log(canalNuevo);
      return this.httpClient.post<void>(`${this.baseURL_canal}/insertarCanal`, canalNuevo);
    }
}
