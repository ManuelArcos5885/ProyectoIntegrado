import { Component, Input } from '@angular/core';
import { Equipo } from '../../equipo';

@Component({
  selector: 'equiposSeleccionadoEstadio',
  templateUrl: './equipos-seleccionado-estadio.component.html',
  styleUrl: './equipos-seleccionado-estadio.component.css'
})
export class EquiposSeleccionadoEstadioComponent {
  @Input() equipoPasado: Equipo[];


  ngOnInit(): void {
    console.log("EQUIPO PASADO: ");
    console.log(this.equipoPasado);
  }
}
