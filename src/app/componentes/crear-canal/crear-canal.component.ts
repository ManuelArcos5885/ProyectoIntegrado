import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Canal } from '../../canal';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CanalService } from '../../services/canal.service';

@Component({
  selector: 'app-crear-canal',
  templateUrl: './crear-canal.component.html',
  styleUrl: './crear-canal.component.css'
})
export class CrearCanalComponent implements OnInit{
  @Input() usuario!: Usuario;
  @Output() close = new EventEmitter<Usuario | null>();
  canalNuevo:Canal = new Canal;

  elegirUsuariosMiembro:boolean = false;


  constructor(private canalServicio:CanalService){};
  


  public async ngOnInit(): Promise<void> {
    
  }

  crearCanal(): void {
    this.canalServicio.insertarCanal(this.canalNuevo)
    .subscribe(
      () => {
        console.log('Equipo Actualizado con éxito'); 
        alert('Canal creado con éxito');
      },
      error => {
        console.error('Error al Actualizado el equipo:', error);
        alert('Error al crear Canal');
      }
    );

    this.close.emit(this.usuario);
  }

  closeModal(): void {
    this.close.emit(null);
  }

  openModalElegirUsuarios(): void {
    this.elegirUsuariosMiembro = true;
    const modal = document.getElementById('elegirUsuariosModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModalElegirUsuarios(usuariosMiembrosPasados: String | null): void {
    const modal = document.getElementById('elegirUsuariosModal');
    if (modal) {

      if(usuariosMiembrosPasados){
        console.log("USUARIOS MIEMBROS PASADOS: ");
        console.log(usuariosMiembrosPasados);
        this.canalNuevo.usuariosMiembro = usuariosMiembrosPasados;
      }

      

      modal.style.display = 'none';
    }
    this.elegirUsuariosMiembro = false;;

    
  }
}
