import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError , BehaviorSubject} from 'rxjs';
import { Usuario } from '../usuario';
import { Respuesta } from '../respuesta';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  mensaje: string="";

  usuario:Usuario = new Usuario();
  
  //URL listado usuarios
  private baseURL ="http://localhost:8080/usuarios";

  constructor(private httpClient: HttpClient,private cookie : CookieService, private usuarioServicio : UsuarioService) { }


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error("Se ha producido un error: " + error.error);
    }
    else{
      console.error("Backend devolvio codigo de estado: " + error.status + error.message);
    }
    return throwError(()=> new Error("Algo fallo, por favor intente de nuevo mas tarde."));
  }




}
