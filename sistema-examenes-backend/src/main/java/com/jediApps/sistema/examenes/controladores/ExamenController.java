package com.jediApps.sistema.examenes.controladores;

import com.jediApps.sistema.examenes.entidades.Categoria;
import com.jediApps.sistema.examenes.entidades.Examen;
import com.jediApps.sistema.examenes.servicios.ExamenService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/examen")
@CrossOrigin("*")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @PostMapping("/")
    public ResponseEntity<Examen> guardar(@RequestBody Examen examen) {
        Examen examenGuardado = examenService.agregarExamen(examen);
        return ResponseEntity.ok(examenGuardado);
    }

    @PutMapping("/")
    public Examen actualizar(@RequestBody Examen examen) {
        return examenService.actualizarExamen(examen);
    }

    @GetMapping("/")
    public ResponseEntity<?> listarExamenes() {
        return ResponseEntity.ok(examenService.obtenerExamenes());
    }

    @GetMapping("/{id}")
    public Examen listarExamen(@PathVariable("id") Long id) {
        return examenService.obtenerExamen(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Long id) {
        examenService.eliminarExamen(id);
    }

    @GetMapping("/categoria/{id}")
    public List<Examen> listarExamenesDeUnaCategoria(@PathVariable("id") Long idCategoria) {
        Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        return examenService.listarExamenesDeUnaCategoria(categoria);
    }
    @GetMapping("/activo")
    public List<Examen> listarExamenesAcivos(){
        return examenService.obtenerExamenesActivos();
    }
    @GetMapping("/categoria/activo/{id}")
    public List<Examen> listarExamenesActivosDeUnaCategoria(@PathVariable("id") Long idCategoria){
         Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        return examenService.obtenerExamenesActivosDeUnaCategoria(categoria);
    }
}
