import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pregunta, Examen } from '../../../models/examen.model';
import { PreguntaService } from '../../../services/pregunta.service';
import { ExamenService } from '../../../services/examen.service'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css'],
})
export class AddPreguntaComponent implements OnInit {
  idExamen: Examen = new Examen();
  pregunta: Pregunta = new Pregunta();
  titulo: string = '';

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private examenService: ExamenService
  ) {}

  ngOnInit(): void {
    this.titulo = this.route.snapshot.params['titulo'];
    const examenId = +this.route.snapshot.params['id'];
    this.examenService.obtenerExamen(examenId).subscribe(
      (examen: Examen) => {
        this.idExamen = examen;
        this.pregunta.examen = this.idExamen;
        console.log(this.idExamen);
        console.log(this.pregunta.examen);
      },
      (error) => {
        console.error('Error al obtener el examen:', error);
      }
    );
  }

  public formSubmit() {
    if (
      this.pregunta.contenido.trim() === '' ||
      this.pregunta.contenido == null ||
      this.pregunta.opcion1.trim() === '' ||
      this.pregunta.opcion1 == null ||
      this.pregunta.opcion2.trim() === '' ||
      this.pregunta.opcion2 == null ||
      this.pregunta.opcion3.trim() === '' ||
      this.pregunta.opcion3 == null ||
      this.pregunta.opcion4.trim() === '' ||
      this.pregunta.opcion4 == null ||
      this.pregunta.respuesta.trim() === '' ||
      this.pregunta.respuesta == null
    ) {
      return;
    }
    this.preguntaService.guardar(this.pregunta).subscribe(
      (dato) => {
        console.log(this.pregunta);
        Swal.fire(
          'Pregunta guardada',
          'La pregunta ha sido agregada exitosamente',
          'success'
        );
        this.resetFormulario();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al guardar la pregunta', 'error');
      }
    );
  }

  private resetFormulario() {
    this.pregunta = new Pregunta();
    this.pregunta.examen = this.idExamen;
  }
}
