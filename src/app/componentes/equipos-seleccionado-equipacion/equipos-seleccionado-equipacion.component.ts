import { Component, Input } from '@angular/core';
import { Equipo } from '../../equipo';
import { Usuario } from '../../usuario';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'equiposSeleccionadoEquipacion',
  templateUrl: './equipos-seleccionado-equipacion.component.html',
  styleUrl: './equipos-seleccionado-equipacion.component.css'
})
export class EquiposSeleccionadoEquipacionComponent {
  @Input() equipoPasado: Equipo[];
  usuarioC:Usuario;
  usuario:Usuario=new Usuario();

  equipoPasados: Equipo[];

  equipoSeleccionado: Equipo | null = null;

  constructor(private router:Router, private cookie : CookieService, private usuarioServicio : UsuarioService, private equipoServicio : EquipoService) {}


  public async ngOnInit(): Promise<void> {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipoPasado);
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();

      await this.timeout(200);
  
    }
    
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  openModal(equipo: Equipo): void {
    this.equipoSeleccionado = { ...equipo };
    const modal = document.getElementById('editarEquipacionModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(equipo: Equipo | null): void {
    const modal = document.getElementById('editarEquipacionModal');
    if (modal) {
      modal.style.display = 'none';
    }
    if (equipo) {
      const index = this.equipoPasado.findIndex(e => e.idequipos === this.equipoSeleccionado!.idequipos);
      if (index > -1) {
        this.equipoPasado[index] = equipo;
      }
    }
    this.equipoSeleccionado = null;
  }
}
