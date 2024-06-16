import { Component } from '@angular/core';
import { Equipo } from '../../equipo';
import { EquipoService } from '../../services/equipo.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-elegir-club',
  templateUrl: './elegir-club.component.html',
  styleUrl: './elegir-club.component.css'
})
export class ElegirClubComponent {
  equipos:Equipo[];
  usuarioC: Usuario;
  equiposElegido:Equipo;

  
  constructor(private equipoServicio:EquipoService, private router:Router, private usuarioService:UsuarioService, private cookie: CookieService ){ }

  async ngOnInit(): Promise<void> {
    this.cookie.set('division', 'Primera');
    if(this.cookie.get("jwt")){
      await this.usuarioCookie();
    }


    this.obtenerEquipos();
  }

  usuarioCookie(){
    return new Promise<void>((resolve, reject) => {
      this.usuarioService.getUser().subscribe(
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




  private obtenerEquipos() {
    var division = this.cookie.get('division');

    
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


  public async elegirEquipo(equipo: Equipo){
    console.log("EQUIPO ELEGIDO: ");
    console.log(equipo);

    this.usuarioService.elegirEquipo(this.usuarioC.username + "", equipo.equipo_nombre).subscribe(() => {
      console.log('Equipo Seleccionado con exito.');

      this.equipoServicio.obtenerEquipoNombre(equipo.equipo_nombre).subscribe(equipos => {
        this.equiposElegido = equipos;

        console.log("Equipo Seleccionado: ");
        console.log(this.equiposElegido);
      });
    }, error => {
      console.error('Hubo un error al procesar la solicitud:', error);
    });

    await this.timeout(200);  
    this.cookie.set("equipoUsuarioEscudo", this.equiposElegido.escudo_equipo);

    this.router.navigate(['/inicio']);

    await this.timeout(200);

    window.location.reload();
  }


  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  actualizarDivision(division: string) {
    console.log("DIVISION: ");
    console.log(division);
    this.cookie.set('division', division);

    this.obtenerEquipos();
  }
}
