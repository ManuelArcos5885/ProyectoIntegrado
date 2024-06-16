import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../usuario';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
import { Respuesta } from '../../respuesta';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../equipo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  usuario:Usuario=new Usuario();
  usuarioC:Usuario;

  respuesta:Respuesta = new Respuesta();

  equiposElegido:Equipo;

  mensaje: string="";

  constructor(private router:Router, private cookie : CookieService, private usuarioServicio : UsuarioService, private equipoServicio : EquipoService) {}



  public async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();

      await this.timeout(200);
  
      if(this.usuarioC && this.usuarioC.equipo_nombre == null){
        this.router.navigate(['/ElegirClub']);
      }
      else{
        this.router.navigate(['']);
      }
    }
    if(this.cookie.get("emailUsuarioCreado")){
      console.log(this.cookie.get("emailUsuarioCreado"));
      this.usuario.email = this.cookie.get("emailUsuarioCreado");

      this.cookie.delete("emailUsuarioCreado");
    }
    
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async login(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      
      this.usuarioServicio.getToken(this.usuario).subscribe(dato => {
        if (dato.jwt == null) {
          this.mensaje = "No se ha encontrado Usuario";
          reject(this.mensaje);
          alert(this.mensaje + ", email o contraseña incorrecta");
        } else {
          this.cookie.set("jwt", dato.jwt);
          resolve();
          
        }
      });
    });
    
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
  


  public async onSubmit(){
    console.log(this.usuario);
    await this.login();

    await this.timeout(200);

    await this.usuarioCookie();

    await this.timeout(200);

    console.log("Usuario Logueado");
    console.log(this.usuarioC.equipo_nombre);

    this.equipoServicio.obtenerEquipoNombre(this.usuarioC.equipo_nombre).subscribe(equipos => {
      console.log(equipos);
      this.cookie.set("equipoUsuarioNombre", equipos.equipo_nombre);
      this.cookie.set("equipoUsuarioEscudo", equipos.escudo_equipo);
    });

    window.location.reload();
    
  }
}
