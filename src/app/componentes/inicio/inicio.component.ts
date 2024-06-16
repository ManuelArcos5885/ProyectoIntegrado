import { Component, OnInit } from '@angular/core';
import { Comentario } from '../../comentario';
import { ActivatedRoute, Router } from '@angular/router';

import { ComentarioService } from '../../services/comentario.service';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { CanalService } from '../../services/canal.service';
import { Usuario } from '../../usuario';
import { ComentarioConNombreUsuario } from '../../comentario-con-nombre-usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  comentariosObtenidos:Comentario[];
  comentariosConUsuario:ComentarioConNombreUsuario[];

  usuarios:Usuario[];
  usuarioC?: Usuario;


  constructor(private route: ActivatedRoute,private router:Router, private comentarioService:ComentarioService,private usuarioServicio:UsuarioService, private cookie: CookieService, private canalServicio:CanalService){}


  public async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }


    await this.obtenerUsuarios();

    await this.timeout(200);


    await this.obtenerComentarios();

    await this.timeout(200);

    console.log("COMENTARIOS: ");
    console.log(this.comentariosObtenidos);

    await this.mapearComentariosConUsuarios();

    await this.timeout(200);

    console.log("COMENTARIOS USUARIOS: ");
    console.log(this.comentariosConUsuario);
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


  public async obtenerUsuarios(){
    this.usuarioServicio.obtenerListaUsuarios().subscribe(ListaUsuarios => {
      this.usuarios = ListaUsuarios;
    });
  }


  public async obtenerComentarios(){
    this.comentarioService.obtenerListaComentariosRecientes().subscribe(Listacomentarios => {
      console.log(Listacomentarios);
      this.comentariosObtenidos = Listacomentarios;
    });
  }


  public async mapearComentariosConUsuarios() {
    this.comentariosConUsuario = this.comentariosObtenidos.map(comentario => {
      let usuarioEncontrado = this.usuarios.find(u => u.idusuarios === comentario.usuario);
      return {
        ...comentario,
        nombreUsuario: usuarioEncontrado ? usuarioEncontrado.nombre : 'Usuario desconocido'
      } as ComentarioConNombreUsuario;
    });
  }
  

}
