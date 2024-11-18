import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Examen, Pregunta } from '../../../models/examen.model';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../../../services/pregunta.service';
import Swal from 'sweetalert2';
import { min } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {
  id: number = 0;
  preguntas: Pregunta[] = [];
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  esEnviado = false;
  timer: any;
  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {}
  ngOnInit(): void {
    this.prevenirBotonRetroceso();
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.cargarPreguntas();
  }
  cargarPreguntas() {
    this.preguntaService
      .listarPreguntasDelExamenParaLaPrueba(this.id)
      .subscribe(
        (dato: Pregunta[]) => {
          console.log(dato);
          this.preguntas = dato;
          this.timer = this.preguntas.length * 2 * 60;
          this.preguntas.forEach((p: Pregunta) => {
            p['respuestaDada'] = '';
          });
          console.log(this.preguntas);
          this.iniciarTemporizador();
        },
        (error) => {
          console.log(error);
          Swal.fire(
            'Error',
            'Error al cargar las preguntas del examen',
            'error'
          );
        }
      );
  }
  prevenirBotonRetroceso() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }
  iniciarTemporizador() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }
  enviarCuestionario() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluarExamen();
      }
    });
  }
  obtenerHoraFormateada() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm}: min : ${ss} : seg`;
  }
  evaluarExamen() {
    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (dato: any) => {
        console.log(dato);
        this.puntosConseguidos = dato.puntosMaximos;
        this.respuestasCorrectas = dato.respuestasCorrectas;
        this.intentos = dato.intentos;
        this.esEnviado = true;
      },
      (error) => {
        console.log(error);
      }
    );
    //   this.esEnviado = true;
    //   this.preguntas.forEach((p: Pregunta) => {
    //     if (p.respuestaDada == p.respuesta) {
    //       this.respuestasCorrectas++;
    //       let puntos =
    //         this.preguntas[0].examen.puntosMaximo / this.preguntas.length;
    //       this.puntosConseguidos += puntos;
    //     }
    //     if (p.respuestaDada.trim() != '') {
    //       this.intentos++;
    //     }
    //   });
    //   console.log('Respuestas correctas : ' + this.respuestasCorrectas);
    //   console.log('Puntos conseguidos : ' + this.puntosConseguidos);
    //   console.log('Intentos : ' + this.intentos);
    //   console.log(this.preguntas);
    // }
  }
  imprimirPagina() {
    window.print();
  }
}
