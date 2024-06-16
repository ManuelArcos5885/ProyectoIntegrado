import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../../usuario';
import { EquipoService } from '../../services/equipo.service';

import { UsuarioService } from '../../services/usuario.service';
import { Equipo } from '../../equipo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit{
  usuarioC:Usuario;
  equiposElegido:Equipo;
  usuarioSeleccionado: Usuario | null = null;

  constructor(private equipoServicio:EquipoService, private router:Router, private usuarioService:UsuarioService, private cookie:CookieService){}

  async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();

      await this.timeout(200);

      this.obtenerEquipoUsuario();
    }



  }

  usuarioCookie(){
    return new Promise<void>((resolve, reject) => {
      this.usuarioService.getUser().subscribe(
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

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  public obtenerEquipoUsuario(){
    if(this.usuarioC && this.usuarioC.equipo_nombre){
      this.equipoServicio.obtenerEquipoNombre(this.usuarioC.equipo_nombre).subscribe(equipos => {
        this.equiposElegido = equipos;
  
        console.log("Equipo Seleccionado: ");
        console.log(this.equiposElegido);
      });
    }
    
  }


  openModal(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
    const modal = document.getElementById('editarUsuario');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(usuario: Usuario | null): void {
    const modal = document.getElementById('editarUsuario');
    if (modal) {
      modal.style.display = 'none';
      window.location.reload();
    }
  }
}
