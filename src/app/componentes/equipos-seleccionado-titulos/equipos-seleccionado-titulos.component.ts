import { Component, Input } from '@angular/core';
import { Equipo } from '../../equipo';
import { TituloService } from '../../services/titulo.service';
import { UsuarioService } from '../../services/usuario.service';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { Ganador } from '../../ganador';
import { Titulo } from '../../titulo';
import { Usuario } from '../../usuario';
import { CookieService } from 'ngx-cookie-service';

import { EquipoService } from '../../services/equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'equiposSeleccionadoTitulos',
  templateUrl: './equipos-seleccionado-titulos.component.html',
  styleUrl: './equipos-seleccionado-titulos.component.css'
})
export class EquiposSeleccionadoTitulosComponent {
  @Input() equipoPasado: Equipo[];
  ganadores: Ganador[];
  Equipos: Equipo[] = [];
  Titulos: Titulo[] = [];
  usuarioC?: Usuario;




  constructor(
    private tituServicio: TituloService,private usuarioServicio:UsuarioService,private ganadorServicio: GanadoresTitulosService,private equipoServicio: EquipoService,private router: Router,private cookieService : CookieService) {}


  public async ngOnInit(): Promise<void> {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipoPasado);




    if(this.cookieService.get("jwt")){
      await this.usuarioCookie();
      console.log("USUARIO: ");
      console.log(this.usuarioC);
    }

    this.obtenerGanadores();
  }


  confirmarBorrado(idGanador: number): void {
    if(this.cookieService.get("jwt")){
      if (window.confirm('¿Estás seguro de que deseas borrar este título?')) {
        this.borrarGanador(idGanador);
      }
    }
    else{
      if (window.confirm('DEBE INICIAR SESION PARA BORRAR UN TITULO, ¿Desea ir al Login?')) {
        this.router.navigate(["Login"]);
      }
      
    }

  }


  borrarGanador(idGanadores: number): void {
    console.log(idGanadores);

    this.ganadorServicio.eliminarGanador(idGanadores).subscribe(
      () => {
        alert('Titulo borrado con éxito'); 
      },
      error => {
        console.error('Error al borrar el Titulo:', error);
      }
    );

    this.router.navigate(['/']);
  }

    
  obtenerGanadores(){
    this.ganadorServicio.obtenerTitulosGanador(this.equipoPasado[0].idequipos).subscribe(ganadores => {
      this.ganadores = ganadores;
      this.obtenerEquiposTitulos(ganadores);
    }, error => {
      console.error('Error al obtener ganadores:', error);
    });
  }

  async obtenerEquiposTitulos(ganadores: Ganador[]): Promise<void> {
    for (const ganador of ganadores) {
      try {
        const equipo = await this.equipoServicio.obtenerEquipoId(ganador.equipo).toPromise();
        if (equipo) {
          this.Equipos.push(equipo);
        }

        const titulos = await this.tituServicio.obtenerTitulo(ganador.titulo).toPromise();
        if (titulos) {
          this.Titulos.push(...titulos);
        }
      } catch (error) {
        console.error('Error al obtener equipos y títulos:', error);
      }
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

  public async seleccionarBoton(competicion:string): Promise<void> {
    this.ganadores = [];
    this.Equipos = [];
    this.Titulos = [];
    console.log("COMPETICION: ");
    console.log(competicion);
    this.ganadorServicio.obtenerGanadoresTitulo(this.equipoPasado[0].equipo_nombre,competicion).subscribe(ganadores => {
      this.ganadores = ganadores;
      
    });

    await this.timeout(200);

    console.log("GANADORES OBTENIDOS: ");
    console.log(this.ganadores);

    this.obtenerEquiposTitulos(this.ganadores);

    await this.timeout(200);

    console.log("GANADORES OBTENIDOS: ");
    console.log(this.ganadores);
    console.log(this.Equipos);
    console.log(this.Titulos);
  }


  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
