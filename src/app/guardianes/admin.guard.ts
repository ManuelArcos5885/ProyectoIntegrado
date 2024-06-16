import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{
  usuarioC:Usuario;

  constructor(private router:Router, private cookieService : CookieService, private usuarioServicio:UsuarioService){ }

  async canActivate(): Promise<boolean | UrlTree> {
    const token= this.cookieService.get('jwt');
    if (token){
      await this.usuarioCookie();

      if(this.usuarioC.tipo_usuario?.toString() && this.usuarioC.tipo_usuario.toString() == 'S'){
        return true;
      }
      else{
        return false;
      }
    }
    else
      {
      this.router.navigate(['/Login']);
      return false;
      }
  }


  usuarioCookie(){
    return new Promise<void>((resolve, reject) => {
      this.usuarioServicio.getUser().subscribe(
        dato => {
          if (dato) { // Verificar si dato no es undefined
            this.usuarioC = dato;
            resolve();
          } else {
            reject(new Error("El usuario no fue encontrado."));
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

};
