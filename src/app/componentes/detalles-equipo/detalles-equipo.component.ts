import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosEquipoService } from '../../services/datos-equipo.service';
import { EquipoService } from '../../services/equipo.service';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { Datos } from '../../datos';
import { Equipo } from '../../equipo';
import { Ganador } from '../../ganador';
import { timeout } from 'rxjs';
import { Comunidad } from '../../comunidad';
import { ComunidadService } from '../../services/comunidad.service';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detalles-equipo',
  templateUrl: './detalles-equipo.component.html',
  styleUrls: ['./detalles-equipo.component.css']
})
export class DetallesEquipoComponent implements OnInit {
  nombreEquipo: string;
  numeroTitulos: number = 0;
  divisionActualLogo:string;
  comunidadObtenida: Comunidad;

  equipoSeleccionado: Equipo | null = null;

  usuarioC?: Usuario;

  equipoPasado: Equipo[];

  mostrarGoles:boolean = false;
  mostrarTitulos:boolean = false;
  mostrarEstadio:boolean = false;
  mostrarPartido:boolean = false;
  mostrarEquipacion:boolean = false;

  constructor(
    private equipoServicio: EquipoService,private route: ActivatedRoute,private ganadoServicio: GanadoresTitulosService, private comunidadServicio:ComunidadService, private cookie : CookieService, private usuarioServicio : UsuarioService) {}

  async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }

    this.route.params.subscribe(params => {
      this.nombreEquipo = params['nombreEquipo'];
      this.obtenerEquipoPasado(this.nombreEquipo);
    });
    await this.timeout(200);
    console.log("COMUNIDAD: ");
    console.log(this.equipoPasado[0].comunidad_nombre);

    if(this.equipoPasado[0].comunidad_nombre && this.equipoPasado[0].comunidad_nombre !='Otro' && this.equipoPasado[0].comunidad_nombre !='otro'){
      this.obtenerComunidad();
      await this.timeout(200);
      console.log(this.comunidadObtenida);
    }

    this.obtenerNumeroGanador(this.equipoPasado[0].idequipos);

    this.obtenerDivisionActual(this.equipoPasado[0].division_actual)
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


  public obtenerComunidad(){
    this.comunidadServicio.obtenerComunidad(this.equipoPasado[0].comunidad_nombre).subscribe(comunidad => {
      this.comunidadObtenida = comunidad;

      console.log("Comunidad Seleccionado: ");
      console.log(this.comunidadObtenida);
    });
  }

  public obtenerDivisionActual(divisionActual:string){
    console.log("DIVISION: ");
      console.log(divisionActual);
    switch (divisionActual) {
      case "Primera":
        this.divisionActualLogo="../../../assets/imagenes_proyecto/otros/laliga.png";
        break;
      case "Segunda":
        this.divisionActualLogo="../../../assets/imagenes_proyecto/otros/logo_segunda.png";
        break;

      case "Tercera":
        this.divisionActualLogo="../../../assets/imagenes_proyecto/otros/Logo_tercera.png";
        break;

      default:
        break;
    }
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  private obtenerEquipoPasado(nombreEquipo: string) {
    this.equipoServicio.obtenerEquipoPasado(nombreEquipo).subscribe(equipos => {
      this.equipoPasado = equipos.map(equipo => ({ ...equipo }));

      if (this.equipoPasado && this.equipoPasado.length > 0) {
        const idequipo = this.equipoPasado[0].idequipos;
        //this.obtenerNumeroGanador(idequipo);
      }
    });
  }

  private obtenerNumeroGanador(idequipo: number) {
    this.ganadoServicio.obtenerTitulosGanador(idequipo).subscribe(ganadoresRecibido => {
      this.numeroTitulos += ganadoresRecibido.length;
      
    });
  }

  public mostrarDatos(datosMostrar:string){
    this.mostrarEquipacion = false;
    this.mostrarPartido = false;
    this.mostrarGoles = false;
    this.mostrarTitulos = false;
    this.mostrarEstadio = false;
    
    switch (datosMostrar) {
      case "equipacion":
        if(this.mostrarGoles){
          this.mostrarEquipacion = false;
        }
        else{
          this.mostrarEquipacion = true;
        }
        
        break;
      case "partidos":
        if(this.mostrarPartido){
          this.mostrarPartido = false;
        }
        else{
          this.mostrarPartido = true;
        }
        break;
      case "goles":
        if(this.mostrarGoles){
          this.mostrarGoles = false;
        }
        else{
          this.mostrarGoles = true;
        }
        break;
      case "titulos":
        if(this.mostrarTitulos){
          this.mostrarTitulos = false;
        }
        else{
          this.mostrarTitulos = true;
        }
        break;
      case "estadio":
        if(this.mostrarEstadio){
          this.mostrarEstadio = false;
        }
        else{
          this.mostrarEstadio = true;
        }
        break;
    
      default:
        break;
    }
  }

  openModal(equipo: Equipo): void {
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
