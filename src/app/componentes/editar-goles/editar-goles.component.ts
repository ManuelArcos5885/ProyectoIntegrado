import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipo } from '../../equipo';
import { EquipoService } from '../../services/equipo.service';


@Component({
  selector: 'app-editar-goles',
  templateUrl: './editar-goles.component.html',
  styleUrl: './editar-goles.component.css'
})
export class EditarGolesComponent implements OnInit{
  @Input() equipo!: Equipo;
  @Output() close = new EventEmitter<Equipo | null>();


  constructor(private equipoServicio:EquipoService){};

  public async ngOnInit(): Promise<void> {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipo); 
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  onSubmit(): void {
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