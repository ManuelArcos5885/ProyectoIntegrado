import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'modalAdvertencia',
  templateUrl: './modal-advertencia.component.html',
  styleUrl: './modal-advertencia.component.css'
})
export class ModalAdvertenciaComponent implements OnInit{
  @Input() mensajePasado!: string;
  @Output() close = new EventEmitter<boolean | null>();


  constructor(){};

  public async ngOnInit(): Promise<void> {
    console.log("Mensaje PASADO: ");
    console.log(this.mensajePasado); 
  }

  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  confirmar(): void {
    this.close.emit(true);
  }

  closeModal(): void {
    this.close.emit(false);
  }
}