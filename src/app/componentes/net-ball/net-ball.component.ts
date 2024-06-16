import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../comentario';
import { ComentarioService } from '../../services/comentario.service';
import { Tema } from '../../tema';
import { TemaService } from '../../services/tema.service';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../../usuario';
import { RespuestaService } from '../../services/respuesta.service';
import { UsuarioService } from '../../services/usuario.service';
import { ComentarioConNombreUsuario } from '../../comentario-con-nombre-usuario';
import { Respuesta } from '../../respuesta';
import { Respuestas } from '../../respuestas';
import { RespuestasConUsuario } from '../../respuestas-con-usuario';
import { CanalService } from '../../services/canal.service';
import { Canal } from '../../canal';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../equipo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-net-ball',
  templateUrl: './net-ball.component.html',
  styleUrl: './net-ball.component.css'
})
export class NetBallComponent implements OnInit{
  escribirComentario = false;
  escribirRespuesta = false;

  comentarioNuevo = new Comentario;
  respuestaNuevo = new Respuestas;

  comentarios:Comentario[];
  temas:Tema[];
  canales:Canal[];
  usuarios:Usuario[];
  respuestas:Respuestas[];

  equipoUsuario:Equipo;
  
  selectedCanal: string;

  selectedTema:string;

  temaSeleccionado:string;
  

  //entidadCOmentario Pero con el nombre del usuario
  comentariosConUsuario:ComentarioConNombreUsuario[];
  respuestasConUsuairo:RespuestasConUsuario[];

  searchQuery = '';
  usuarioC?: Usuario;

  botonRedactarMensaje:string = "Redactar Mensaje";

  mostrarCrearCanal: boolean = false;

  constructor(private route: ActivatedRoute,private router:Router, private equipoServicio:EquipoService, private comentarioService:ComentarioService, private temaService:TemaService,private respuestaService:RespuestaService,private usuarioServicio:UsuarioService, private cookie: CookieService, private canalServicio:CanalService){}


  public async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }

    await this.obtenerTemas();

    await this.obtenerCanal();

    await this.obtenerUsuarios();

    await this.timeout(200);
    console.log("COMENTARIOS: ");
    console.log(this.comentarios);

    console.log("CANALES: ");
    console.log(this.canales);

    console.log("Temas: ");
    console.log(this.temas);

    

    await this.timeout(200);

    this.selectedCanal = this.canales[0].nombreCanal;
    this.comentarioNuevo.canal = this.canales[0].nombreCanal;

    await this.timeout(200);

    if(this.temas && this.temas.length > 0){
      this.comentarioNuevo.tema = this.temas[0].tema_nombre;
    }

    if(this.usuarioC){
      console.log("USUARIO LOGUEADO: ");
      console.log(this.usuarioC);
      this.comentarioNuevo.usuario = this.usuarioC.idusuarios;
    }

    await this.timeout(200);
    console.log("USUARIOS: ");
    console.log(this.usuarios);
    console.log(this.comentarios);

    await this.timeout(200);

    this.seleccionarCanal(this.comentarioNuevo.canal);

    
    await this.timeout(200);

    console.log(this.comentariosConUsuario);
  }





  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async obtenerComentarios(){
    this.comentarioService.obtenerListaComentarios().subscribe(Listacomentarios => {
      console.log(Listacomentarios);
      this.comentarios = Listacomentarios;
    });
  }

  public async obtenerCanal(){
    this.canalServicio.obtenerListaCanal().subscribe(ListaCanal => {
      this.canales = ListaCanal;
    });

  }

  
  public async obtenerTemas(){
    this.temaService.obtenerListaTemas().subscribe(ListaTemas => {
      this.temas = ListaTemas;
    });

  }

  public async obtenerUsuarios(){
    this.usuarioServicio.obtenerListaUsuarios().subscribe(ListaUsuarios => {
      this.usuarios = ListaUsuarios;
    });
  }

  public async obtenerRespuestas(idComentario:number){
    console.log("IDCOMENTARIO: ");
    console.log(idComentario);
    this.respuestaService.obtenerRespuestasComentario(idComentario).subscribe(ListaRespuestas => {
      this.respuestas = ListaRespuestas;
    });

    await this.timeout(200);

    console.log(this.respuestas);

    this.respuestasConUsuairo = this.respuestas.map(respuesta => {
      let usuarioEncontrado = this.usuarios.find(u => u.idusuarios === respuesta.usuario);
      return {
        ...respuesta,
        nombreUsuario: usuarioEncontrado ? usuarioEncontrado.nombre : 'Usuario desconocido'
      } as RespuestasConUsuario;

    });
  }


  public async mapearComentariosConUsuarios() {
    this.comentariosConUsuario = this.comentarios.map(comentario => {
      let usuarioEncontrado = this.usuarios.find(u => u.idusuarios === comentario.usuario);
      return {
        ...comentario,
        nombreUsuario: usuarioEncontrado ? usuarioEncontrado.nombre : 'Usuario desconocido'
      } as ComentarioConNombreUsuario;
    });
  }

  public abrirCreadorComentario() {
    if(this.botonRedactarMensaje == "Redactar Mensaje"){
      this.botonRedactarMensaje = "Cancelar";
    }
    else{
      this.botonRedactarMensaje = "Redactar Mensaje";
    }
    this.escribirComentario = !this.escribirComentario;
  }

  public crearComentario() {
    if(this.validarCamposAntesInsertar()){
      if (this.comentarioNuevo) {
        console.log('Comentario nuevo:', this.comentarioNuevo);
        this.comentarioService.insertarComentario(this.comentarioNuevo).subscribe({
          next: (response) => {
            window.alert('Comentario creado exitosamente');
            
            
            window.location.reload();
          },
          error: (err) => {
            window.alert('Error al crear comentario');
            console.error(err);
          }
        });
        
      } else {
        console.log('Comentario vacío');
        window.alert('No se puede crear el comentario');
      }
    }
  }

  public validarCamposAntesInsertar(): boolean{
    console.log(this.comentarioNuevo);
    this.crearFechaPublicacion();
    if(!this.comentarioNuevo.mensaje && this.comentarioNuevo.mensaje == null || this.comentarioNuevo.mensaje == ''){
      return false;
    }
    if(!this.comentarioNuevo.tema && this.comentarioNuevo.tema == null || this.comentarioNuevo.tema == ''){
      return false;
    }
    if(!this.comentarioNuevo.usuario && this.comentarioNuevo.usuario == null){
      return false;
    }
    if(!this.comentarioNuevo.canal && this.comentarioNuevo.canal == null && this.comentarioNuevo.canal == ''){
      return false;
    }
    if(!this.comentarioNuevo.fechaPublicacion && this.comentarioNuevo.fechaPublicacion == null && this.comentarioNuevo.fechaPublicacion == ''){
      return false;
    }

    return true;
  }

  public validarCamposAntesInsertarRespuesta(): boolean{
    console.log(this.respuestaNuevo);
    this.crearFechaPublicacionRespuesta();
    if(!this.respuestaNuevo.mensaje && this.respuestaNuevo.mensaje == null || this.respuestaNuevo.mensaje == ''){
      return false;
    }

    if(!this.respuestaNuevo.usuario && this.respuestaNuevo.usuario == null){
      return false;
    }

    if(!this.respuestaNuevo.fecha && this.respuestaNuevo.fecha == null && this.respuestaNuevo.fecha == ''){
      return false;
    }

    return true;
  }


  public crearFechaPublicacion(){
    this.comentarioNuevo.fechaPublicacion = new Date() + '';

    this.comentarioNuevo.fechaPublicacion = this.formatDateToDDMMYYYYHHMMSS();
  }

  public crearFechaPublicacionRespuesta(){
    this.respuestaNuevo.fecha = new Date() + '';

    this.respuestaNuevo.fecha = this.formatDateToDDMMYYYYHHMMSS();
  }

  public formatDateToDDMMYYYYHHMMSS() {
    let fechaNueva = new Date();
    const day = fechaNueva.getDate();
    const month = fechaNueva.getMonth() + 1; // Los meses en JavaScript van hasta el 11
    const year = fechaNueva.getFullYear();
    
    const hours = fechaNueva.getHours();
    const minutes = fechaNueva.getMinutes();
    const seconds = fechaNueva.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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



  isAuthenticated(): boolean {
    // Aquí puedes verificar si el usuario está autenticado basándote en la existencia de usuarioC o cualquier otra lógica que utilices
    return this.usuarioC !== undefined;
  }


  public async seleccionarTema(temaNombre:string){
    console.log("TEMA SELECCIONADO: ");
    console.log(temaNombre);
    this.comentarioService.obtenerListaComentariosTemas(temaNombre,this.selectedCanal).subscribe(ListaComentarios => {
      this.comentarios = ListaComentarios;
    });

    await this.timeout(200);
    this.mapearComentariosConUsuarios();

    this.selectedTema = temaNombre;
  }


  public async seleccionarCanal(canal: string) {
    this.selectedCanal = canal;
    this.comentarioNuevo.canal = canal;
    console.log('Canal seleccionado:', this.selectedCanal);

    if(this.selectedTema){
      this.comentarioService.obtenerListaComentariosCanal(this.selectedTema,this.comentarioNuevo.canal).subscribe(ListarComentarios =>{
        console.log("COMENTARIOS OBTENIDOS: ")
        console.log(ListarComentarios);
        this.comentarios = ListarComentarios;
      });
    }

    else{
      this.comentarioService.obtenerListaComentariosCanal("",this.comentarioNuevo.canal).subscribe(ListarComentarios =>{
        console.log("COMENTARIOS OBTENIDOS: ")
        console.log(ListarComentarios);
        this.comentarios = ListarComentarios;
      });
    }
    

    await this.timeout(200);

    if(this.comentarios){
      await this.mapearComentariosConUsuarios();
    }
    
  }


  mostrarRedactarRespuesta(idComentario:number){
    if(this.escribirRespuesta){
      this.escribirRespuesta = false;
    }
    else{
      this.respuestaNuevo.comentario= idComentario;
      this.escribirRespuesta = true;
    }
  }

  public async crearRespuesta(idComentario:number){
    if(this.respuestaNuevo){
      if(this.usuarioC){
        this.respuestaNuevo.usuario = this.usuarioC.idusuarios;
      }

      this.respuestaNuevo.comentario = idComentario;
      
      if(this.validarCamposAntesInsertarRespuesta()){
        if (this.comentarioNuevo) {
          if(this.usuarioC?.idusuarios){
            this.respuestaNuevo.usuario = this.usuarioC?.idusuarios;
          }
          

          console.log('Respuesta nuevo:', this.respuestaNuevo);
          this.respuestaService.insertarRespuesta(this.respuestaNuevo).subscribe({
            next: (response) => {
              window.alert('Respuesta creado exitosamente');

              this.obtenerRespuestas(this.respuestaNuevo.comentario);
              this.escribirRespuesta = false;
              this.respuestaNuevo = new Respuestas;
            },
            error: (err) => {
              window.alert('Error al crear comentario');
              console.error(err);
            }
          });
          
        } else {
          console.log('Comentario vacío');
          window.alert('No se puede crear el comentario');
        }

        
      }
    }
  }


  openModal(usuario: Usuario): void {
    this.mostrarCrearCanal = true;;
    const modal = document.getElementById('crearCanalModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('crearCanalModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.mostrarCrearCanal = false;;

    window.location.reload();
  }


  public esUsuarioMiembro(canalComprobarusuario:Canal):boolean{
    console.log(canalComprobarusuario);
    console.log(canalComprobarusuario.usuariosMiembro);

    if(this.usuarioC){
      if(this.usuarioC.tipo_usuario == 'S'){
        return false;
      }
    }
    else{
      if(canalComprobarusuario.nombreCanal == "GLOBAL"){
        return false;
      }
      else{
        return true;
      }
    }

    if(!canalComprobarusuario.usuariosMiembro){
      return false; 
    }

    if(this.usuarioC){
      let esMiembro = canalComprobarusuario.usuariosMiembro.includes('' + this.usuarioC?.username)
      console.log("ES MIEMBRBO? ");
      console.log(esMiembro);
      if(esMiembro){
        return false;
      }
      else{
        return true;
      }
    }
    


    return true;
  }


  confirmarBorrado(idComentario: number): void {
    if (window.confirm('¿Estás seguro de que deseas borrar este comentario?')) {
        this.borrarComentario(idComentario);
        window.location.reload();
    }
    

  }


  borrarComentario(idComentario: number): void {
    console.log(idComentario);
    this.comentarioService.eliminarComentario(idComentario).subscribe(result =>{
      if(result){
        console.log('Comentario borrado con éxito'); 
        alert('Comentario borrado con éxito');
        this.obtenerComentarios();
      }
      else{
        console.error('Error al borrar el comentario:');
        alert("ERROR AL BORRAR COMENTARIO");
      }
    });


      

  }

}