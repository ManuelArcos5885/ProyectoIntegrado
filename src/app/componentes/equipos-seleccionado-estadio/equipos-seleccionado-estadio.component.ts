import { Component, Input } from '@angular/core';
import { Equipo } from '../../equipo';
import { Usuario } from '../../usuario';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
import { EquipoService } from '../../services/equipo.service';
import { EstadioSerciveService } from '../../services/estadio-sercive.service';
import { Estadio } from '../../estadio';

@Component({
  selector: 'equiposSeleccionadoEstadio',
  templateUrl: './equipos-seleccionado-estadio.component.html',
  styleUrl: './equipos-seleccionado-estadio.component.css'
})
export class EquiposSeleccionadoEstadioComponent {
  @Input() equipoPasado: Equipo[];
  usuarioC:Usuario;
  usuario:Usuario=new Usuario();

  estadioEquipoPadaso:Estadio;

  estadioSeleccionado: Estadio | null = null;

  constructor(private router:Router, private cookie : CookieService, private usuarioServicio : UsuarioService, private equipoServicio : EquipoService, private estadioServicio : EstadioSerciveService) {}


  public async ngOnInit(): Promise<void> {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipoPasado);

    if(this.cookie.get("jwt")){
      await this.usuarioCookie();

      await this.timeout(200);
  
    }
    console.log("USUARIO LOGUEADO: ");
    console.log(this.usuarioC);

    this.obtenerEstadioEquipoPasado();

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

  obtenerEstadioEquipoPasado(){
    this.estadioServicio.obtenerEstadioEquipoPasado(this.equipoPasado[0].equipo_nombre).subscribe(estadio =>{
      this.estadioEquipoPadaso = estadio;
    });
  }


  openModal(estadio: Estadio): void {
    this.estadioSeleccionado = { ...estadio };

    this.estadioSeleccionado.equipoNombre = this.equipoPasado[0].equipo_nombre;
    const modal = document.getElementById('editarEstadioModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(estadio: Estadio | null): void {
    const modal = document.getElementById('editarEstadioModal');
    if (modal) {
      modal.style.display = 'none';
    }
    
    this.estadioSeleccionado = null;
  }
}
