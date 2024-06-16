import { Component, OnInit } from '@angular/core';
import { Comunidad } from '../../comunidad';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-crear-comunidad',
  templateUrl: './crear-comunidad.component.html',
  styleUrl: './crear-comunidad.component.css'
})
export class CrearComunidadComponent implements OnInit{

  selectedFile: File | null = null;
  imageUrlBandera: any;
  imageUrlEscudo: any;
  
  comunidad:Comunidad=new Comunidad();


  constructor(private servicio:ComunidadService, private router:Router){}

  ngOnInit(): void {
    
  }

  guardarComunidad(){
    console.log("Comunidad nueva:" + this.comunidad);
    this.servicio.registrarComunidad(this.comunidad).subscribe(dato=>{
      console.log(dato);
      this.irListaComunidad();
    },error=>console.log(error));
  }



  irListaComunidad(){
    this.router.navigate(["ListarComunidades"]);
  }
  


  onSubmit() {
    var validacion = this.validar();
    if (validacion !== "") {
      alert(validacion);
      return; // No enviar el formulario si hay errores de validación
    } else {
      alert("insertado");

      this.guardarComunidad();
    }
  }



  validar() {
    let error: string = "";
  

    
    if (!this.comunidad.comunidad_nombre || !this.comunidad.comunidad_bandera || !this.comunidad.comunidad_escudo) {
      error = "Por favor, complete todos los campos obligatorios. Nombre, bandera y escudo";
      return error;
    }

    return error;
}

onFileSelected(event: any,tipo:string) {
  this.selectedFile = event.target.files[0] as File; // Obtener la imagen seleccionada por el usuario
  this.previewImage(tipo); // Mostrar la vista previa de la imagen seleccionada
}

previewImage(tipo:string) {
  const reader = new FileReader();
  reader.onload = (e: any) => {
    if(tipo=="Bandera"){
      this.imageUrlBandera = e.target.result;
    }
    else{
      this.imageUrlEscudo = e.target.result;
    }
    
  };
  reader.readAsDataURL(this.selectedFile as Blob);
}

}