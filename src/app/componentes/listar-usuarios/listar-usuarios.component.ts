import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit{
  usuarios:Usuario[];
  usuarioC?: Usuario;

  usuarioSeleccionado: Usuario | null = null;


  constructor(private router:Router, private cookie : CookieService, private usuarioServicio : UsuarioService){ }

  async ngOnInit(): Promise<void> {
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }
    
    this.obtenerUsuarios();
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


  private obtenerUsuarios(){
    this.usuarioServicio.obtenerListaUsuarios().subscribe(dato=>{
      this.usuarios = dato;
    });
  }


  onSubmit(){
    
  }

  openModal(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
    const modal = document.getElementById('editarUsuario');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(usuario: Usuario | null): void {
    const modal = document.getElementById('editarUsuario');
    if (modal) {
      modal.style.display = 'none';
      window.location.reload();
    }
  }

}

