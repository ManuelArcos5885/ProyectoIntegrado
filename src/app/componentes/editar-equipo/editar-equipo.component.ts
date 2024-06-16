import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comunidad } from '../../comunidad';
import { Equipo } from '../../equipo';
import { EquipoService } from '../../services/equipo.service';
import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrl: './editar-equipo.component.css'
})
export class EditarEquipoComponent {
  comunidades:Comunidad[];
  @Input() equipo!: Equipo;
  @Output() close = new EventEmitter<Equipo | null>();

  divisiones:String[] = ["Primera","Segunda","Tercera"];


  constructor(private equipoServicio:EquipoService, private comunidadServicio:ComunidadService){};

  public async ngOnInit(): Promise<void> {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipo);

    this.obtenerComunidades();
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  private obtenerComunidades() {
    this.comunidadServicio.obtenerListaComunidades().subscribe(comunidades => {
      this.comunidades = comunidades;
    });
  }

  onSubmit(): void {
    console.log("EQUIPO ACTUALIZAR");
    console.log(this.equipo);
    this.equipoServicio.actualizarDatosEquipo(this.equipo)
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

    this.close.emit(this.equipo);
  }

  closeModal(): void {
    this.close.emit(null);
  }


}

