import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../../../services/examen.service';
import { Categoria, Examen } from '../../../models/examen.model';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrl: './actualizar-examen.component.css',
})
export class ActualizarExamenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}
  id = 0;
  examen!: Examen;
  categorias: Categoria[] = [];
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.examenService.obtenerExamen(this.id).subscribe(
      (dato: any) => {
        this.examen = dato;
        console.log(this.examen);
      },
      (error) => {
        console.log(error);
      }
    );
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
      },
      (error) => {
        alert('Error al cargar las categorias');
      }
    );
  }
  public actualizarDatos() {
    this.examenService.guardar(this.examen).subscribe(
      (dato) => {
        Swal.fire(
          'Examen actualizado',
          'El examen ha sido actualizado con éxito',
          'success'
        ).then((e) => {
          this.router.navigate(['/admin/examenes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'Error al actualizar el examen', 'error');
        console.log(error);
      }
    );
  }
}
