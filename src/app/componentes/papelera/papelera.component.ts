import { Component } from '@angular/core';
import { Ganador } from '../../ganador';
import { Equipo } from '../../equipo';
import { Titulo } from '../../titulo';
import { Usuario } from '../../usuario';
import { TituloService } from '../../services/titulo.service';
import { UsuarioService } from '../../services/usuario.service';
import { GanadoresTitulosService } from '../../services/ganadores-titulos.service';
import { EquipoService } from '../../services/equipo.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Comentario } from '../../comentario';
import { ComentarioService } from '../../services/comentario.service';
import { ComentarioConNombreUsuario } from '../../comentario-con-nombre-usuario';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrl: './papelera.component.css'
})
export class PapeleraComponent {
  ganadores: Ganador[];
  Equipos: Equipo[] = [];
  Titulos: Titulo[] = [];
  usuarioC?: Usuario;

  equiposObtenidos:Equipo[] = [];
  ComentarioObtenidos:Comentario[] = [];
  comentariosConUsuario:ComentarioConNombreUsuario[];
  usuariosComentario:Usuario[];
  
  mostrarEquipos:boolean = false;
  mostrarTitulos:boolean = false;
  mostrarComentarios:boolean = false;

  idGanadorHaBorrar:number;
  idequipoHaBorrar:number;
  idComentarioHaBorrar:number;
  mensajeAdvertencia: string | null = null;


  constructor(
    private tituServicio: TituloService,private usuarioServicio:UsuarioService,private ganadorServicio: GanadoresTitulosService,private equipoServicio: EquipoService,private router: Router,private cookieService : CookieService, private comentarioServicio : ComentarioService
  ) {}

  public async ngOnInit(): Promise<void> {
    if(this.cookieService.get("jwt")){
      await this.usuarioCookie();
      console.log("USUARIO: ");
      console.log(this.usuarioC);
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

  public mostrarPapeleraTitulos(){
    if(this.mostrarTitulos){
      this.mostrarTitulos = false;
      this.ganadores = [];
      this.Equipos = [];
      this.ganadores = [];
      
    }
    else{
      this.mostrarTitulos=true;
      this.mostrarEquipos = false;
      this.mostrarComentarios = false;

      this.ganadorServicio.obtenerGanadoresBorrados().subscribe(ganadoresBorrados => {
        this.ganadores = ganadoresBorrados;
        this.obtenerEquiposTitulos(ganadoresBorrados);
        
      });
      
    }
  }

  
  public async obtenerUsuarios(){
    this.usuarioServicio.obtenerListaUsuarios().subscribe(ListaUsuarios => {
      this.usuariosComentario = ListaUsuarios;
    });
  }

  public mostrarPapeleraEquipos(){
    if(this.mostrarEquipos){
      this.mostrarEquipos = false;
    }
    else{
      this.mostrarEquipos=true;
      this.mostrarTitulos=false;
      this.mostrarComentarios = false;

      this.equipoServicio.obtenerTodosEquiposBorrado().subscribe(equiposBorrados => {
        console.log("EQUIPOS BORRADOS: ");
        console.log(equiposBorrados);
        this.equiposObtenidos = equiposBorrados;

      });
    }
  }

  public async mostrarPapeleraComentarios(){
    if(this.mostrarComentarios){
      this.mostrarComentarios = false;
    }
    else{
      this.mostrarComentarios=true;
      this.mostrarTitulos=false;
      this.mostrarEquipos=false;

      await this.obtenerUsuarios();

      this.comentarioServicio.obtenerListaComentariosBorrados().subscribe(comentariosBorrados => {
        this.ComentarioObtenidos = comentariosBorrados;
        
      });

      await this.timeout(200);

      if(this.ComentarioObtenidos){
        await this.mapearComentariosConUsuarios();
      }

    }
  }

  
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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


  confirmarBorrado(idGanador: number): void {
    this.idComentarioHaBorrar = -1;
    this.idequipoHaBorrar= -1;
    this.idGanadorHaBorrar= idGanador;
    if(this.cookieService.get("jwt")){
      const modal = document.getElementById('editarEquipoDatos');
      if (modal) {
        modal.style.display = 'block';
      }
      this.openModal();
      
    }
    else{
      if (window.confirm('DEBE INICIAR SESION PARA BORRAR UN TITULO, ¿Desea ir al Login?')) {
        this.router.navigate(["Login"]);
      }
      
    }

  }

  confirmarBorradoClub(idEquipo: number): void {
    this.idGanadorHaBorrar = -1;
    this.idComentarioHaBorrar = -1;
    this.idequipoHaBorrar= idEquipo;
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

  confirmarBorradoComentario(idComentario: number): void {
    this.idGanadorHaBorrar = -1;
    this.idequipoHaBorrar= -1;
    this.idGanadorHaBorrar= idComentario;
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



  openModal(): void {
    this.mensajeAdvertencia="Esto eliminará el Titulo Permanentemente de la base de datos, ¿Estas seguro que quieres eliminarlo?";
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
      if(this.idGanadorHaBorrar != -1){
        this.borrarGanadorPermanentemente(this.idGanadorHaBorrar);
      }
      if(this.idequipoHaBorrar != -1){
        this.borrarGanadorPermanentemente(this.idGanadorHaBorrar);
      }
      if(this.idComentarioHaBorrar != -1){
        this.borrarGanadorPermanentemente(this.idGanadorHaBorrar);
      }
      
      window.location.reload();
    }
    

    
  }

  borrarGanadorPermanentemente(idGanadores: number): void {
    console.log(idGanadores);

    this.ganadorServicio.eliminarGanadorPermanente(idGanadores).subscribe(result => {
      if(result){
        alert('Titulo borrado con éxito'); 
      }
      else{
        alert('Error, titulo no encontrado'); 
      }
    });
    
  }

  restablecer(idGanadores: number):void{
    console.log(idGanadores);

    this.ganadorServicio.restablecerGanador(idGanadores).subscribe(result => {
      if(result){
        alert('Titulo restablecido con éxito'); 
        window.location.reload();
      }
      else{
        alert('Error, Titulo no encontrado'); 
      }
    });
  }

  restablecerClub(idequipo: number):void{
    console.log(idequipo);

    this.equipoServicio.restablecerEquipo(idequipo).subscribe(result => {
      if(result){
        alert('Equipo restablecido con éxito');
        window.location.reload(); 
      }
      else{
        alert('Error, Equipo no encontrado'); 
      }
    });
  }

  restablecerComentario(idComentario: number):void{
    console.log(idComentario);

    this.comentarioServicio.restablecerComentario(idComentario).subscribe(result => {
      if(result){
        alert('Comentario restablecido con éxito'); 
        window.location.reload();
      }
      else{
        alert('Error, Comentario no encontrado'); 
      }
    });
  }


  public async mapearComentariosConUsuarios() {
    this.comentariosConUsuario = this.ComentarioObtenidos.map(comentario => {
      let usuarioEncontrado = this.usuariosComentario.find(u => u.idusuarios === comentario.usuario);
      return {
        ...comentario,
        nombreUsuario: usuarioEncontrado ? usuarioEncontrado.nombre : 'Usuario desconocido'
      } as ComentarioConNombreUsuario;
    });
  }
}
