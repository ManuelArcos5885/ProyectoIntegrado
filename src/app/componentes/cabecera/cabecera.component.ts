import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{
  
  usuarioC?: Usuario;
  escudoEquipoUsuario: string;

  constructor(private usuarioServicio :UsuarioService, private cookie: CookieService){};

  async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }
    console.log("EQUIPO USUARIO: ");
    console.log(this.cookie.get("equipoUsuarioEscudo"));
    if(this.cookie.get("equipoUsuarioNombre")){
      this.escudoEquipoUsuario = this.cookie.get("equipoUsuarioEscudo");
    }

    console.log(this.usuarioC?.tipo_usuario);

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



  isAuthenticated(): boolean {
    // Aquí puedes verificar si el usuario está autenticado basándote en la existencia de usuarioC o cualquier otra lógica que utilices
    return this.usuarioC !== undefined;
  }


  public async cerrarSesion(){
    await this.eliminarCockieInicioSesion();
    await this.timeout(200);

    window.location.reload();

    
        
  }

  public async eliminarCockieInicioSesion(){
    // Eliminar la cookie llamada "jwt"
    this.cookie.delete("jwt");
    // Reiniciar usuarioC para reflejar el cierre de sesión
    this.usuarioC = undefined; // Reiniciar la variable usuarioC a undefined al cerrar sesión
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
