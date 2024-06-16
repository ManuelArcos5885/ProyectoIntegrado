import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';
import { Respuesta } from '../respuesta';
import { CookieService } from 'ngx-cookie-service';
import { Equipo } from '../equipo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  
  //URL listado usuarios
  private baseURL ="http://localhost:8080/usuarios";

  constructor(private httpClient : HttpClient,private coockie : CookieService) { }

  //con la baseURL devuelve todos los empleados en una lista
  obtenerListaUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseURL + "/listartodos"}`);
  }




  registrarUsuario(usuario:Usuario):Observable<Object>{
    return this.httpClient.post(`${this.baseURL + "/insertar"}`,usuario);
  }


  getToken(user : Usuario){
    return this.httpClient.post<Respuesta>(`${this.baseURL}/getToken`,user);
  }

  getUser(){
    let cookie : string = this.coockie.get("jwt");
    return this.httpClient.get<Usuario>(`${this.baseURL}/getUser/${cookie}`);
  }

  public elegirEquipo(usuarioUsername: String, equipoNombre: string){
    console.log("DATOS:");
    console.log(usuarioUsername);
    console.log(equipoNombre);
    const requestBody = { username: usuarioUsername, equipoNombre: equipoNombre };
    return this.httpClient.post<void>(`${this.baseURL}/elegirEquipo`, requestBody);
  }

  public obtenerEquipoNombre(nombreEquipo:string):Observable<Equipo>{
    return this.httpClient.get<Equipo>(`${this.baseURL}/equipoPorNombre?nombreEquipo=${nombreEquipo}`);
  }



  public actualizarDatosUsuario(usuario:Usuario):Observable<any>{
    console.log("Usuario Actualizar: " + usuario);
    return this.httpClient.post<void>(`${this.baseURL}/actualizarDatosUsuario`, usuario);
  }


  

}
