import { Component } from '@angular/core';
import { Equipo } from '../../equipo';
import { map } from 'rxjs';
import { EquipoService } from '../../services/equipo.service';

import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-listar-equipos',
  templateUrl: './listar-equipos.component.html',
  styleUrl: './listar-equipos.component.css'
})
export class ListarEquiposComponent {
  titulo: string = "Equipos 1º Division Española";
  equipos:Equipo[];
  botonSeleccionado: string;
  usuarioC?: Usuario;

  constructor(private equipoServicio:EquipoService,private usuarioServicio:UsuarioService, private cookieService: CookieService,private router:Router,private route: ActivatedRoute ){ }

  public async ngOnInit(): Promise<void> {
    if(this.cookieService.get("jwt")){
      await this.usuarioCookie();
      console.log("USUARIO: ");
      console.log(this.usuarioC);
    }

    await this.timeout(200);
    
    this.route.paramMap.subscribe(params => {
      let parametroValor = params.get('division');
      if(parametroValor){
        parametroValor = parametroValor?.toLowerCase();
      }
      
      let divisionValue = parametroValor !== null ? parametroValor : "primera";
      this.actualizarDivision(divisionValue);
    });

    this.botonSeleccionado = "";
  }


  private actualizarDivision(division: string) {
    console.log("DIVISION: ");
    console.log(division);
    if(division){
      this.cookieService.set('division', division.toLowerCase());
    }



    switch (division) {
      case 'primera':
        this.titulo = "Equipos 1º Division Española";
        break;
      case 'segunda':
        this.titulo = "Equipos 2º Division Española";
        break;
      case 'tercera':
        this.titulo = "Equipos Primera RFEF";
        break;
      default:
        this.titulo = "Listar Equipos";
        break;
    }

    this.obtenerEquipos();
  }


  onSubmit(division: string) {
    // Guardamos el valor en la cookie
    this.cookieService.set('division', division);


    this.botonSeleccionado =this.cookieService.get("division");


    switch (division) {
      case 'Primera':
        this.titulo = "Equipos 1º Division Española";
        break;
      case 'Segunda':
        this.titulo = "Equipos 2º Division Española";
        
        break;
      case 'Tercera':
        this.titulo = "Equipos Primera RFEF";
        break;
      default:
        this.titulo = "Listar Equipos";
        break;
    }

    
    this.obtenerEquipos();
  }


  
  private obtenerEquipos() {
    var division = this.cookieService.get('division');

    
    this.equipoServicio.obtenerListaEquipos(division).pipe(
      map(equipos => {
        
        return equipos.map(equipos => {
          return {
            ...equipos,

            
          };
        });
      })
    ).subscribe(equipos => {
      this.equipos = equipos;
    });
  }


  aumentarTamanio(event: MouseEvent){
    var boton = event.target as HTMLButtonElement;
    boton.style.width = '120px';
    boton.style.height = '60px';


  }
  reducirTamanio(event: MouseEvent){
    var boton = event.target as HTMLButtonElement;
    boton.style.width = '';
    boton.style.height = '';
  }


  borrarEquipo(nombre: string): void {
    console.log(nombre);
    this.equipoServicio.eliminarEquipo(nombre)
    .subscribe(
      () => {
        console.log('Equipo borrado con éxito'); 
        alert('Equipo borrado con éxito');
      },
      error => {
        console.error('Error al borrar el equipo:', error);
        alert("ERROR AL BORRAR EQUIPO");
      }
    );

    this.router.navigate(["/"]);


      

  }

  confirmarBorrado(equipoNombre: string): void {
    if(this.cookieService.get("jwt")){
      if (window.confirm('¿Estás seguro de que deseas borrar este equipo?')) {
          this.borrarEquipo(equipoNombre);
      }
    }
    else{
      if (window.confirm('DEBE INICIAR SESION PARA BORRAR UN EQUIPO, ¿Desea ir al Login?')) {
        this.router.navigate(["Login"]);
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



  public isAuthenticated(): boolean {
    if(this.usuarioC){
      return true;
    }
    else{
      return false;
    }
  }

  public async esAdministrador(){
    await this.timeout(200);
    if(this.usuarioC){
      console.log("USUARIO ES ADMIN?");
      console.log(this.usuarioC?.tipo_usuario);
      if(this.usuarioC?.tipo_usuario && this.usuarioC?.tipo_usuario == 'A'){
        return true;
      }
    }
    return false;
  }


  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


}

