import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from '../../usuario';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-elegir-usuarios',
  templateUrl: './elegir-usuarios.component.html',
  styleUrl: './elegir-usuarios.component.css'
})
export class ElegirUsuariosComponent implements OnInit{
  @Output() close = new EventEmitter<String | null>();

  usuarios:Usuario[];
  usuarioC?: Usuario;
  usuariosMiembros:string;

  usuarioSeleccionado: Usuario | null = null;


  constructor(private router:Router, private cookie : CookieService, private usuarioServicio : UsuarioService){ }

  async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }
    
    this.obtenerUsuarios();

    await this.timeout(200);

    console.log("USUARIO LOGUEADO");
    console.log(this.usuarioC);
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

  onSubmit(): void {
    let usuariosActivados = this.usuarios.filter(usuario => usuario.seleccionado);
    this.usuariosMiembros = usuariosActivados.map(usuario => usuario.username).join(';');

    // Añade el usuario logueado
    if (this.usuarioC) {
      this.usuariosMiembros = this.usuarioC.username + ';' + this.usuariosMiembros;
    }

    console.log('Usuarios seleccionados:', usuariosActivados);
    console.log('usuariosMiembros:', this.usuariosMiembros);


    this.close.emit(this.usuariosMiembros);
  }

  closeModal(): void {
    this.close.emit(null);
  }


  private obtenerUsuarios(){
    this.usuarioServicio.obtenerListaUsuarios().subscribe(dato=>{
      this.usuarios = dato;
    });
  }
}
