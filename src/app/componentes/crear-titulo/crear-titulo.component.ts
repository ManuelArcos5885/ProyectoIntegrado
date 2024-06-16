import { Component, OnInit } from '@angular/core';
import { Titulo } from '../../titulo';
import { TituloService } from '../../services/titulo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-titulo',
  templateUrl: './crear-titulo.component.html',
  styleUrl: './crear-titulo.component.css'
})
export class CrearTituloComponent implements OnInit{

  titulo:Titulo=new Titulo();

  selectedFile: File | null = null;
  imageUrlLogo: any;



  constructor(private servicioTitulo:TituloService, private router:Router){}



  ngOnInit(): void {

  }


  guardarTitulo(){
    console.log("Titulo nueva:" + this.titulo);
    this.servicioTitulo.registrarTitulo(this.titulo).subscribe(dato=>{
      console.log(dato);
      this.irListaComunidad();
    },error=>console.log(error));
  }

  irListaComunidad(){
    this.router.navigate(["ListarTitulos"]);
  }




  onSubmit() {
    var validacion = this.validar();
    if (validacion !== "") {
      alert(validacion);
      return; // No enviar el formulario si hay errores de validación
    } else {
      alert("insertado");

      this.guardarTitulo();
    }
  }


  validar() {
    let error: string = "";
    
    if (!this.titulo.tituloNombre || !this.titulo.tituloLogo) {
      error = "Por favor, complete todos los campos obligatorios.";
      return error;
    }

    return error;
}




  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File; // Obtener la imagen seleccionada por el usuario
    this.previewImage(); // Mostrar la vista previa de la imagen seleccionada
  }
  
  previewImage() {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrlLogo = e.target.result;
      

      
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }

}
