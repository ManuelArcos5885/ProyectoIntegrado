import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equipo } from '../../equipo';
import { Estadio } from '../../estadio';
import { EquipoService } from '../../services/equipo.service';
import { EstadioSerciveService } from '../../services/estadio-sercive.service';

@Component({
  selector: 'app-editar-estadio',
  templateUrl: './editar-estadio.component.html',
  styleUrl: './editar-estadio.component.css'
})
export class EditarEstadioComponent {
  @Input() estadio!: Estadio;
  @Output() close = new EventEmitter<Estadio | null>();


  constructor(private equipoServicio:EquipoService, private estadioServicio : EstadioSerciveService){};

  public async ngOnInit(): Promise<void> {
    console.log("Estadio PASADO: ");
    console.log(this.estadio); 

  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  onSubmit(): void {
    this.estadioServicio.actualizarDatosEstadio(this.estadio)
    .subscribe(
      () => {
        console.log('Estadio Actualizado con éxito'); 
        alert('Equipo Actualizado con éxito');
      },
      error => {
        console.error('Error al Actualizado el estadio:', error);
        alert("ERROR AL Actualizado EQUIPO");
      }
    );

    this.close.emit(this.estadio);
  }

  closeModal(): void {
    this.close.emit(null);
  }
}