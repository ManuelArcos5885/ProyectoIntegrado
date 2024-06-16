import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Equipo } from '../../equipo';

@Component({
  selector: 'app-editar-equipacion',
  templateUrl: './editar-equipacion.component.html',
  styleUrl: './editar-equipacion.component.css'
})
export class EditarEquipacionComponent {
  @Input() equipo!: Equipo;
  @Output() close = new EventEmitter<Equipo | null>();

  onFileSelected(event: any, tipo: string): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (tipo === 'primera') {
          this.equipo.equipo_equipacion_primera = e.target.result;
        } else if (tipo === 'segunda') {
          this.equipo.equipo_equipacion_segunda = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.close.emit(this.equipo);
  }

  closeModal(): void {
    this.close.emit(null);
  }
}