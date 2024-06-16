import { Component, Input } from '@angular/core';
import { Equipo } from '../../equipo';
import { Usuario } from '../../usuario';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'equiposSeleccionadoPartidos',
  templateUrl: './equipos-seleccionado-partidos.component.html',
  styleUrl: './equipos-seleccionado-partidos.component.css'
})
export class EquiposSeleccionadoPartidosComponent {
  @Input() equipoPasado: Equipo[];

  usuarioC:Usuario;
  usuario:Usuario=new Usuario();

  diferenciaGoles:number;
  equipoSeleccionado: Equipo | null = null;

  constructor(private router:Router, private cookie : CookieService, private usuarioServicio : UsuarioService, private equipoServicio : EquipoService) {}


  public async ngOnInit(): Promise<void> {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipoPasado);

    if(this.cookie.get("jwt")){
      await this.usuarioCookie();

      await this.timeout(200);
  
    }

    this.diferenciaGoles = this.equipoPasado[0].goles_favor - this.equipoPasado[0].goles_contra;
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
    const modal = document.getElementById('editarPartidoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(equipo: Equipo | null): void {
    const modal = document.getElementById('editarPartidoModal');
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
