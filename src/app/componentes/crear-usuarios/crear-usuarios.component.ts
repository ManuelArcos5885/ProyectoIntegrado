import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css'
})
export class CrearUsuariosComponent implements OnInit{
  usu:Usuario=new Usuario();
  passwordConfirmacion:string;

  constructor(private servicio:UsuarioService, private router:Router, private cookie : CookieService){}

  ngOnInit(): void {
    this.usu.tipo_usuario= 'U';
  }


  guardarUsuario(){
    this.servicio.registrarUsuario(this.usu).subscribe(dato=>{
      console.log(dato);
      this.irListaUsuarios();
    },error=>console.log(error));


    
  }


  irListaUsuarios() {
    let emailUsuarioCreado = this.usu.email.toString(); // Asegúrate que emailUsuarioCreado sea de tipo string
    this.cookie.set("emailUsuarioCreado", emailUsuarioCreado);
  
    this.router.navigate(["Login"]);
  }
  


  onSubmit() {
    var validacion = this.validar();
    if (validacion !== "") {
      alert(validacion);
      return; // No enviar el formulario si hay errores de validación
    } else {
      console.log(this.usu);
      this.guardarUsuario();
    }
  }



  validar() {
    let error: string = "";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{1,}$/;  

    
    if (!this.usu.nombre || !this.usu.password || !this.usu.username || !this.usu.email) {
      error = "Por favor, complete todos los campos obligatorios. Nombre, password, username y email";
      return error;
    }
    if (!regex.test(this.usu.email.toString())) {
      error = "Por favor, introduzca un email válido";
      return error;
    }

    if(this.passwordConfirmacion != this.usu.password){
      error = "Error, la confirmación de contraseña no coincide con la contraseña";
      return error;
    }

    return error;
}

}
