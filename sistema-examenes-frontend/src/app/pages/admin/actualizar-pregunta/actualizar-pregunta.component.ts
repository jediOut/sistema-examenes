import { Component, OnInit } from '@angular/core';
import { Examen, Pregunta } from '../../../models/examen.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../../../services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrl: './actualizar-pregunta.component.css',
})
export class ActualizarPreguntaComponent implements OnInit {
  id: number = 0;
  pregunta: Pregunta = new Pregunta();
  examen: Examen = new Examen();
  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.preguntaService.obtenerPregunta(this.id).subscribe(
      (dato) => {
        this.pregunta = dato;
        console.log(this.pregunta);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public actualizar() {
    this.preguntaService.actualizar(this.pregunta).subscribe((dato) => {
      Swal.fire(
        'Pregunta actualizada',
        'La pregunta ha sido actualizada con éxito',
        'success'
      ).then((e) => {
        this.router.navigate([
          '/admin/ver-preguntas/' +
            this.pregunta.examen.id +
            '/' +
            this.pregunta.examen.titulo,
        ]);
      });
    });
  }
}
