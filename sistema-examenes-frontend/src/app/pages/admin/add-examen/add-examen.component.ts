import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenService } from '../../../services/examen.service';
import { Router } from '@angular/router';
import { Examen } from '../../../models/examen.model';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrl: './add-examen.component.css',
})
export class AddExamenComponent implements OnInit {
  categorias: any = [];
  examenData: Examen = new Examen();

  constructor(
    private categoriaService: CategoriaService,
    private snack: MatSnackBar,
    private examenSerrvice: ExamenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar los datos', 'error');
      }
    );
  }
  guardar() {
    console.log(this.examenData);
    if (
      this.examenData.titulo.trim() == '' ||
      this.examenData.titulo.trim() == null
    ) {
      this.snack.open('El titulo es requerido !!', '', {
        duration: 3000,
      });
      return;
    }
    this.examenSerrvice.guardar(this.examenData).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire(
          'Examen guardado',
          'El examen ha sido guardado con exito',
          'success'
        );
        this.examenData = new Examen();
        this.router.navigate(['admin/examenes']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al guardar el examen', 'error');
      }
    );
  }
}
