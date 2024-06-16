import { Component, OnInit } from '@angular/core';
import { TituloService } from '../../services/titulo.service';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { EquipoService } from '../../services/equipo.service';
import { Ganador } from '../../ganador';
import { Equipo } from '../../equipo';
import { Titulo } from '../../titulo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-listar-todos-titulos',
  templateUrl: './listar-todos-titulos.component.html',
  styleUrls: ['./listar-todos-titulos.component.css']
})
export class ListarTodosTitulosComponent implements OnInit {

  ganadores: Ganador[];
  Equipos: Equipo[] = [];
  Titulos: Titulo[] = [];
  usuarioC?: Usuario;

  idGanadorHaBorrar:number;

  mensajeAdvertencia: string | null = null;

  constructor(
    private tituServicio: TituloService,private usuarioServicio:UsuarioService,private ganadorServicio: GanadoresTitulosService,private equipoServicio: EquipoService,private router: Router,private cookieService : CookieService
  ) {}

  public async ngOnInit(): Promise<void> {
    if(this.cookieService.get("jwt")){
      await this.usuarioCookie();
      console.log("USUARIO: ");
      console.log(this.usuarioC);
    }

    this.obtenerGanadores()
      .subscribe(ganadores => {
        this.ganadores = ganadores;
        this.obtenerEquiposTitulos(ganadores);
      }, error => {
        console.error('Error al obtener ganadores:', error);
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
  
  obtenerGanadores(): Observable<Ganador[]> {
    return this.ganadorServicio.obtenerGanadores();
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

  confirmarBorrado(idGanador: number): void {
    this.idGanadorHaBorrar= idGanador;
    if(this.cookieService.get("jwt")){
      const modal = document.getElementById('editarEquipoDatos');
      if (modal) {
        modal.style.display = 'block';
      }
      this.openModal();
      //this.borrarGanador(idGanador);
      
    }
    else{
      if (window.confirm('DEBE INICIAR SESION PARA BORRAR UN TITULO, ¿Desea ir al Login?')) {
        this.router.navigate(["Login"]);
      }
      
    }

  }


  public async seleccionarBoton(competicion:string): Promise<void> {
    this.ganadores = [];
    this.Equipos = [];
    this.Titulos = [];
    console.log("COMPETICION: ");
    console.log(competicion);
    this.ganadorServicio.obtenerGanadoresTituloTodos(competicion).subscribe(ganadores => {
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


  openModal(): void {
    this.mensajeAdvertencia="Esto eliminará el Titulo, ¿Estas seguro que quieres eliminarlo?";
    const modal = document.getElementById('advertenciaModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(respuesta:boolean | null): void {
    console.log("RESPUESTA");
    console.log(respuesta);
    const modal = document.getElementById('advertenciaModal');
    if (modal) {
      modal.style.display = 'none';
    }

    this.mensajeAdvertencia = null;

    if(respuesta){
      this.borrarGanador(this.idGanadorHaBorrar);
      window.location.reload();
    }
    

    
  }
}
