import { Component, Input, OnInit, input } from '@angular/core';
import { Equipo } from '../../equipo';
import { EquipoService } from '../../services/equipo.service';
import { ActivatedRoute } from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';
import { Comunidad } from '../../comunidad';
import { time } from 'node:console';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-ciudad-equipo',
  templateUrl: './ciudad-equipo.component.html',
  styleUrl: './ciudad-equipo.component.css'
})
export class CiudadEquipoComponent implements OnInit{
  equipoPasado: string;

  equipoObtenido:Equipo;

  comunidadObtenida: Comunidad;
  

  constructor(private route: ActivatedRoute, private equipoServicio:EquipoService, private comunidadServicio:ComunidadService) {}


  public async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      this.equipoPasado = params['nombreEquipo'];
      this.obtenerEquipo();
    });

    await this.timeout(200);
    this.obtenerComunidad();
  }

  public async obtenerEquipo(){
    console.log("EQUIPO PASADO: ");
    console.log(this.equipoPasado);

    this.equipoServicio.obtenerEquipoNombre(this.equipoPasado).subscribe(equipos => {
      this.equipoObtenido = equipos;

      console.log("Equipo Seleccionado: ");
      console.log(this.equipoObtenido);
    });
  }
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  public obtenerComunidad(){
    this.comunidadServicio.obtenerComunidad(this.equipoObtenido.comunidad_nombre).subscribe(comunidad => {
      this.comunidadObtenida = comunidad;

      console.log("Comunidad Seleccionado: ");
      console.log(this.comunidadObtenida);
    });
  }
}
