import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  @Input() usuario!: Usuario;
  @Output() close = new EventEmitter<Usuario | null>();
  usuarioC?: Usuario;


  constructor(private usuarioServicio:UsuarioService, private cookie : CookieService){};

  public async ngOnInit(): Promise<void> {
    console.log("Usuario PASADO: ");
    console.log(this.usuario); 

    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
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

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  onSubmit(): void {
    console.log("USUARIO ACTUALIZAR: ");
    console.log(this.usuario);
    this.usuarioServicio.actualizarDatosUsuario(this.usuario)
    .subscribe(
      () => {
        console.log('Equipo Actualizado con éxito'); 
        alert('Equipo Actualizado con éxito');
      },
      error => {
        console.error('Error al Actualizado el equipo:', error);
        alert("ERROR AL Actualizado EQUIPO");
      }
    );

    this.close.emit(this.usuario);
  }

  closeModal(): void {
    this.close.emit(null);
  }
}
