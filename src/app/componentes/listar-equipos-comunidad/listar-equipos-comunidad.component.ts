import { Component, Input, OnInit } from '@angular/core';
import { Comunidad } from '../../comunidad';
import { Equipo } from '../../equipo';
import { ComunidadService } from '../../services/comunidad.service';
import { EquipoService } from '../../services/equipo.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../usuario';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-listar-equipos-comunidad',
  templateUrl: './listar-equipos-comunidad.component.html',
  styleUrl: './listar-equipos-comunidad.component.css'
})
export class ListarEquiposComunidadComponent implements OnInit{
  comunidadEquipoPasada:string;
  comunidadEquipo:Comunidad;
  ciudadEquipo:string;
  usuarioC?: Usuario;

  
  equipoSeleccionado: Equipo | null = null;

  equiposComunidades:Equipo[];

  constructor(private route: ActivatedRoute, private comunidadServicio:ComunidadService, private equipoServicio:EquipoService, private cookie : CookieService, private usuarioServicio : UsuarioService){ }

  async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }

    this.route.params.subscribe(params => {
      if(params['comunidadEquipo']){
        this.comunidadEquipoPasada = params['comunidadEquipo'];
        this.obtenerComunidad();
      }
      if(params['ciudadEquipo?']){
        this.ciudadEquipo = params['ciudadEquipo?'];
      }
      
    });

    await this.timeout(200);
    console.log("CIUDAD");
    console.log(this.ciudadEquipo);

    if(this.ciudadEquipo){
      this.obtenerEquipoCiudad();
    }
    else{
      this.obtenerEquipoComunidad();
    }

    await this.timeout(200);
    console.log("EQUIPOS COMUNIDADDES");
    console.log(this.equiposComunidades);
    
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
  
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public obtenerComunidad(){
    this.comunidadServicio.obtenerComunidad(this.comunidadEquipoPasada).subscribe(comunidad =>{
      this.comunidadEquipo = comunidad;
    });
  }

  public obtenerEquipoComunidad(){
    this.equipoServicio.obtenerEquiposComunidad(this.comunidadEquipoPasada).subscribe(equipos => {
      this.equiposComunidades = equipos;
    });
  }

  public obtenerEquipoCiudad(){
    this.equipoServicio.obtenerEquiposCiudad(this.ciudadEquipo).subscribe(equipos => {
      this.equiposComunidades = equipos;
    });
  }


  openModal(equipo: Equipo): void {
    console.log(equipo);
    this.equipoSeleccionado = { ...equipo };
    const modal = document.getElementById('editarEquipoDatos');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(equipo: Equipo | null): void {
    const modal = document.getElementById('editarEquipoDatos');
    if (modal) {
      modal.style.display = 'none';
    }
    this.equipoSeleccionado = null;

    window.location.reload();
  }

}
